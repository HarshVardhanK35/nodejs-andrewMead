const path = require('path')
const express = require("express")
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')

// import generateMessage() --- use destructuring
const { generateMessage, generateLocationMessage } = require('./utils/messages')

// import user management functions 
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()

const server = http.createServer(app)

const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, "../public")

app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
  console.log("New Websocket Connection!")

  socket.on('join', ({ username, room }, callback) => {

    // with destructuring
    // const { error, user } = addUser({ id: socket.id, username: username, room: room })
    
    // without destructuring
    const { error, user } = addUser({ id: socket.id, username: username, room: room })

    if (error) {
      return callback(error)
    }

    socket.join(user.room)

    socket.emit('message', generateMessage('Admin', "Welcome!"))
    socket.broadcast.to(room).emit('message', generateMessage('Admin', `${username} has joined!`))

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    })

    callback()
  })

  socket.on('sendMessage', (message, callback) => {

    const user = getUser(socket.id);
    // console.log(user)

    const filter = new Filter()

    if (filter.isProfane()) {
      callback('Profanity is not allowed!')
    }

    io.to(user.room).emit('message', generateMessage(user.username, message))
    callback()
  })

  socket.on('sendLocation', (coords, callback) => {

    const user = getUser(socket.id)
    // console.log(user)

    io.to(user.room).emit('location', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.longitude},${coords.latitude}`))
    callback()
  })

  socket.on('disconnect', () => {

    // we use removeUser function here
    const user = removeUser(socket.id)
    console.log(user)

    if (user) { 
      io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left the chat!`))
    }

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    })
  })
})

server.listen(port, () => {
  console.log(`Server up and running on http://localhost:${port}`)
})