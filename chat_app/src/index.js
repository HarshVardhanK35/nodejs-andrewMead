const path = require('path')
const express = require("express")
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')

// import generateMessage() --- use destructuring
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express()

const server = http.createServer(app)

const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public")

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
  console.log("New Websocket Connection!")

  socket.on('join', ({ username, room }) => {

    socket.join(room)

    socket.emit('message', generateMessage("Welcome!"))
    socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined!`))

  })

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter()

    if (filter.isProfane()) {
      callback('Profanity is not allowed!')
    }

    io.to().emit('message', generateMessage(message))
    callback()
  })

  socket.on('sendLocation', (coords, callback) => {
    io.emit('location', generateLocationMessage(`https://google.com/maps?q=${coords.longitude},${coords.latitude}`))
    callback()
  })

  socket.on('disconnect', () => {
    io.to().emit('message', generateMessage("A user has left the chat!"))
  })
})

server.listen(port, () => {
  console.log(`Server up and running on http://localhost:${port}`)
})