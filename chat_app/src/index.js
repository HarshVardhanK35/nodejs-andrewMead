const path = require('path')
const express = require("express")
const http = require('http')
const socketio = require('socket.io')

const app = express()

const server = http.createServer(app)

const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public")

app.use(express.static(publicDirectoryPath))

let data = "Welcome!"

io.on('connection', (socket) => {
  console.log("New Websocket Connection!")

  socket.emit('message', data)

  socket.on('sendMessage', (message) => {
    io.emit('message', message)
  })
})

server.listen(port, () => {
  console.log(`Server up and running on http://localhost:${port}`)
})