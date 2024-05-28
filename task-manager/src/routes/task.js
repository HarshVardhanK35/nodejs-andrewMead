const express = require('express');
const router = new express.Router()

// auth-middleware
const auth = require("../middleware/auth")

// import Task schema
const Task = require('../models/task')

// create new task
router.post('/tasks', auth, async (req, res) => {
  // const task = new Task(req.body);      // before modification
  const task = new Task ({
    ...req.body,
    createdBy: req.user._id               // the person we just authenticated
  })                                      // after modification
  try{
    task.save()
    res.status(201).send(task)
  }
  catch(err) {
    res.status(400).send(err)
  }
})

// get all tasks
router.get('/tasks', async (req, res) => {

  try{
    const tasks = await Task.find({})
    res.send(tasks)
  }
  catch(err){
    res.status(500).send("Tasks not found!")
  }
})

// get a specific task
router.get('/tasks/:id', async (req, res) => {

  const _id = req.params.id

  try{
    const task = await Task.findById(_id)
    if(!task){
      return res.status(404).send("Task not found!")
    }
    res.send(task)
  }
  catch(err) {
    res.status(500).send(err)
  }
})

// updating a single user with Id
router.patch('/tasks/:id', async(req, res) => {

  const reqBodyUpdates = Object.keys(req.body);
  const updatesAllowed = ['description', 'completed'];

  const isValidOperation = reqBodyUpdates.every((reqBodyUpdate) => {
    return updatesAllowed.includes(reqBodyUpdate)
  })

  if(!isValidOperation) {
    res.status(400).send({ error: "Invalid updates!" })
  }

  const _id = req.params.id

  try{

    const task = await Task.findById(_id)
    reqBodyUpdates.forEach((update) => {
      task[update] = req.body[update]
    })
    await task.save()

    // const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

     if(!task){
      res.status(404).send("Task not found!")
    }
    res.send(task)
  }
  catch(err){
    res.status(400).send(err)
  }
})

// delete a task with Id
router.delete('/tasks/:id', async(req, res) => {
  const _id = req.params.id
    try{
      const task = await Task.findByIdAndDelete(_id)

      if(!task){
        return res.status(404).send("Task not found!")
      }
      res.send(task)
    }
    catch(err){
      res.status(500).send(err)
    }
})

module.exports = router