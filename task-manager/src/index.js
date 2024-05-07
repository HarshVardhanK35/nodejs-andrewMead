// import express
const express = require('express');

require('./db/mongoose')
const User = require('./models/user');
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// middleware - to parse the incoming JSON
app.use(express.json())

/*
 * POST req - resource creation
 * 1st- arg: path
 * 2nd: callback function
 * POST req - to create a new user
*/
app.post('/users', (req, res) => {
  const user = new User(req.body)  // create a new instance of user using User model from models/user.js
  user.save()  // save the created user to db and handle the promise
  .then(() => {
    res.status(201)
    res.send(user)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

// fetching multiple users --- use find method
app.get('/users', (req, res) => {
  User.find({})
  .then((users) => {
    res.send(users) // array of users
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

// fetching single user --- using unique Id
app.get('/users/:id', (req, res) => {

  const _id = req.params.id;

  User.findById(_id)
  .then((user) => {
    res.send(user)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

app.post('/tasks', (req, res) => {

  const task = new Task(req.body);

  task.save()
  .then(() => {
    res.status(201).send(task)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

app.get('/tasks', (req, res) => {
  Task.find({})
  .then((task) => {
    res.send(task)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

app.get('/tasks/:id', (req, res) => {

  const _id = req.params.id

  Task.findById(_id)
  .then((task) => {
    if(!task){
      return res.status(404).send()
    }

    res.send(task)
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

// listen to the port: 3000
app.listen(port, () => {
  console.log(`Server up and listening on https://localhost:${port}`)
})