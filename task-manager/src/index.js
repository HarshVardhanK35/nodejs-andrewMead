// import express
const express = require('express');

require('./db/mongoose')

const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

const app = express()

const port = process.env.PORT || 3000

// middleware functions --- to send a response that "site is under maintenance"
// app.use((req, res, next) => {
//   res.status(503).send("site is under maintenance... check back soon!")
// })

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

