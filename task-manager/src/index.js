// import express
const express = require('express');

require('./db/mongoose')
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task')

const app = express()
const port = process.env.PORT || 3000

// middleware - to parse the incoming JSON
app.use(express.json())

// middleware - to use routes
app.use(userRouter)

// middleware - to task routes
app.use(taskRouter)

// listen to the port: 3000
app.listen(port, () => {
  console.log(`Server up and listening on https://localhost:${port}`)
})