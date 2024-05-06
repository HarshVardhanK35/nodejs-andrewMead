// import express
const express = require('express');
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

/*
 * POST req - resource creation
 * 1st- arg: path
 * 2nd: callback function
*/
// POST req - to create a new user
app.post('/users', (req, res) => {
  // create a new instance of user using User model from models/user.js
  console.log(req.body)
  console.log(res)
  // const user = new User(req.body)
})

app.listen(port, () => {
  console.log(`Server up and listening on https://localhost:${port}`)
})