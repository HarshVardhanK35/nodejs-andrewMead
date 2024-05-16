const express = require('express');
const router = new express.Router()

// import User schema
const User = require('../models/user')

/*
 * POST req - resource creation
 * 1st- arg: path
 * 2nd: callback function
*/

// POST req - to create a new user
router.post('/users', async (req, res) => {
  const user =  new User(req.body)  // create a new instance of user using User model from models/user.js
  try{
    await user.save();              // save the created user to db and handle the promise

    // after saving the user generate a token
    const token = await user.generateAuthToken()


    res.status(201).send({ user, token });
  }
  catch(err){
    res.status(400).send(err)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken()
    res.send({ user, token })
  }
  catch(err) {
    res.status(400).send(err)
  }
})

// fetching multiple users --- use find method
router.get('/users', async (req, res) => {

  try{
    const users = await User.find({})
    res.send(users)
  }
  catch(err){
    res.send(500).send()
  }
})

// fetching single user --- using unique Id
router.get('/users/:id', async (req, res) => {

  const _id = req.params.id;

  try{
    const user = await User.findById(_id)
    if(!user){
      res.status(404).send("User not found!")
    }
    res.send(user)
  }
  catch(err){
    res.status(500).send()
  }
})

// updating a single user with Id
router.patch('/users/:id', async(req, res) => {

  const reqBodyUpdates = Object.keys(req.body);
  const updatesAllowed = ['name', 'email', 'password', 'age'];

  const isValidOperation = reqBodyUpdates.every((reqBodyUpdate) => {
    return updatesAllowed.includes(reqBodyUpdate)
  })

  if(!isValidOperation) {
    res.status(400).send({ error: "Invalid updates!" })
  }

  const _id = req.params.id

  try{
    const user = await User.findById(_id)
    reqBodyUpdates.forEach((update) => {
      user[update] = req.body[update]
    })
    await user.save()

    // this is commented because it is bypassing and directly updating in the database
    // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })

     if(!user){
      res.status(404).send()
    }
    res.send(user)
  }
  catch(err){
    res.status(400).send(err)
  }
})

// delete a user with Id
router.delete('/users/:id', async(req, res) => {
  const _id = req.params.id
    try{
      const user = await User.findByIdAndDelete(_id)

      if(!user){
        res.status(404).send("User not found!")
      }
      res.send(user)
    }
    catch(err){
      res.status(500).send(err)
    }
})

module.exports = router