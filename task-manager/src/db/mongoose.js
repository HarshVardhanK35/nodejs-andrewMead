// import mongoose
const mongoose = require("mongoose");
const validator = require("validator")

// Require 'dotenv'
require("dotenv").config();

const uri = process.env.MONGODB_URI

// connect to the database --- takes connection URL, options
mongoose.connect(uri)
  .then(() => {console.log("connected to database")})
  .catch((err) => {console.log(err)});

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if(!validator.isEmail(value)){
        throw new Error("Email is invalid!")
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if(value.toLowerCase().includes("password")){
        throw new Error("Invalid password!")
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if(value < 0) {
        throw new Error('Age must be a positive number!')
      }
    }
  }
})

// const user = new User({
//   name: "  John  ",
//   email: "john@email.com",
//   password: "myPassTo9!",
//   age: 1
// })

// user.save()
// .then(()=> {
//   console.log(user)
// })
// .catch((err) => {
//   console.log(err)
// })

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