// import mongoose
const mongoose = require("mongoose");

// Require 'dotenv'
require("dotenv").config();

const uri = process.env.MONGODB_URI

// connect to the database --- takes connection URL, options
mongoose.connect(uri)
  .then(() => {console.log("connected to database")})
  .catch((err) => {console.log(err)});

const Tasks = mongoose.model('Tasks', {
  description: {
    type: String,
  },
  completed: {
    type: Boolean
  }
})

const task = new Tasks({
  description: "drink water",
  completed: true
})

task.save()
.then(()=> {
  console.log(task)
})
.catch((err) => {
  console.log(err)
})