const path = require('path')
const express = require("express")
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()

const server = http.createServer(app)

const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public")

app.use(express.static(publicDirectoryPath))

let data = "Welcome!"

io.on('connection', (socket) => {
  console.log("New Websocket Connection!")

  socket.broadcast.emit('message', "A new user has joined the chat!")

  socket.emit('message', data)

  socket.on('sendMessage', (message, callback) => {

    const filter = new Filter()

    if (filter.isProfane()) {
      callback('Profanity is not allowed!')
    }

    io.emit('message', message)
    callback()
  })

  socket.on('sendLocation', (coords, callback) => {
    io.emit('location', `https://google.com/maps?q=${coords.longitude},${coords.latitude}`)
    callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', "A user has left the chat!")
  })
})

server.listen(port, () => {
  console.log(`Server up and running on http://localhost:${port}`)
})