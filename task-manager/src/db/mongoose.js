// import mongoose
const mongoose = require("mongoose");

// Require 'dotenv'
require("dotenv").config();

const uri = process.env.MONGODB_URI

// connect to the database --- takes connection URL, options
mongoose.connect(uri)
  .then(() => {console.log("connected to database")})
  .catch((err) => {console.log(err)});

const Task = mongoose.model('Task', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false,
  }
})

const task = new Task({
  description: "Water plants",
  completed: true
})

task.save()
.then(() => {
  console.log(task)
})
.catch((err) => {
  console.log("Error occurred", err)
})