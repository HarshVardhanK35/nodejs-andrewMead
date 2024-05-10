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
*/

// POST req - to create a new user
app.post('/users', async (req, res) => {
  const user =  new User(req.body)  // create a new instance of user using User model from models/user.js

  try{
    await user.save();              // save the created user to db and handle the promise
    res.status(201).send(user);
  }
  catch(err){
    res.status(400).send()
  }
})

// fetching multiple users --- use find method
app.get('/users', async (req, res) => {

  try{
    const users = await User.find({})
    res.send(users)
  }
  catch(err){
    res.send(500).send()
  }
})

// fetching single user --- using unique Id
app.get('/users/:id', async (req, res) => {

  const _id = req.params.id;

  try{
    const user = await User.findById(_id)
    if(!user){
      res.status(404).send()
    }
    res.send(user)
  }
  catch(err){
    res.status(500).send()
  }
})

// create new task
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try{
    task.save()
    res.status(201).send()
  }
  catch(err) {
    res.status(400).send(err)
  }
})

// get all tasks
app.get('/tasks', async (req, res) => {

  try{
    const tasks = await Task.find({})
    res.send(tasks)
  }
  catch(err){
    res.status(500).send()
  }
})

// get a specific task
app.get('/tasks/:id', async (req, res) => {

  const _id = req.params.id

  try{
    const task = await Task.findById(_id)
    if(!task){
      return res.status(404).send()
    }
    res.send(task)
  }
  catch(err) {
    res.status(500).send(err)
  }
})

// listen to the port: 3000
app.listen(port, () => {
  console.log(`Server up and listening on https://localhost:${port}`)
})