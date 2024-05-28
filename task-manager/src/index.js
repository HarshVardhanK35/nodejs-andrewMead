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

// get user details using task-id

// const Task = require('./models/task')
// const getUserFromTask = async () => {
//   try {
//     const task = await Task.findById('66548e2e3fb959e24dba0a1d');      // task-id was provided
//     await task.populate('createdBy')
//     console.log(task.createdBy);
//   } catch (error) {
//     console.error(error);
//   }
// }
// getUserFromTask()

// get tasks created by user using user-id
// const User = require('./models/user')
// const getTaskFromUser = async() => {
//   const user = await User.findById('66548da3f7d0ba282cb52740')        // user-id was provided
//   await user.populate('tasks')
//   console.log(user.tasks)
// }
// getTaskFromUser()