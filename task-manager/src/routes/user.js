const express = require('express');

const auth = require('../middleware/auth')

const router = new express.Router()

// import task-model.. if user deletes himself delete tasks created by himself
const Task = require('../models/task')

// import User schema
const User = require('../models/user')

// POST req - to create a new user -> "signup"
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

// login route
router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken()
    res.send({ user: user.getPublicProfile(), token })                              // *> need to put token here or else it return error while accessing route -> user/me
  }
  catch(err) {
    res.status(400).send(err)
  }
})

// log out route
router.post('/users/logout', auth, async (req, res) => {
  try{
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token                                                // *> used within the filter method to remove the current session's authentication token from the user's tokens array
    })
    await req.user.save()
    res.send("Logged out successfully!")
  }
  catch(err){
    res.status(500).send(err)
  }
})

// route to logout from all devices
router.post('/users/logoutAll', auth, async (req, res) => {
  try{
    req.user.tokens = []
    await req.user.save()
    res.send("Logged out from all devices successfully!")
  }
  catch(err){
    res.status(500).send(err)
  }
})

// fetching profile --- use find method
router.get('/users/me', auth, async (req, res) => {
  res.send( req.user.getPublicProfile() )
})

// fetching single user --- using unique Id
// router.get('/users/:id', async (req, res) => {
//   try{
//     const user = await User.findById(req.params.id)
//     if(!user){
//       res.status(404).send("User not found!")
//     }
//     res.send(user)
//   }
//   catch(err){
//     res.status(500).send()
//   }
// })

// updating a single user with Id >>> this is modified check the docs for the previous version of update router
router.patch('/users/me', auth, async(req, res) => {
  const reqBodyUpdates = Object.keys(req.body);
  const updatesAllowed = ['name', 'email', 'password', 'age'];
  const isValidOperation = reqBodyUpdates.every((reqBodyUpdate) => {        // *> returns true if all elements in the array satisfy the provided testing function.
    return updatesAllowed.includes(reqBodyUpdate)
  })
  if(!isValidOperation) {
    res.status(400).send({ error: "Invalid updates!" })
  }
  try{
    const user = await User.findById(req.user._id)
    reqBodyUpdates.forEach((update) => {
      user[update] = req.body[update]
    })
    await user.save()
    // this is commented because it is bypassing and directly updating in the database
    // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    res.send(user)
  }
  catch(err){
    res.status(400).send(err)
  }
})

// delete a user with Id >>> replace "users/:id" with "users/me"
router.delete('/users/me', auth, async(req, res) => {
  try{
    const user = await User.findByIdAndDelete(req.user._id)
    // delete the tasks when user deletes his profile
    await Task.deleteMany({ createdBy: req.user._id })
    if(!user){
      res.status(404).send()
    }
    res.send(req.user)
  }
  catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router