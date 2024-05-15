const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
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
  }
)

// find a user by their email and password before login
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email })
  // if user was not found
  if(!user){
    throw new Error('Unable to login!')
  }
  // if user was found check password
  const isMatch = await bcrypt.compare(password, user.password)
  // if password does not match
  if(!isMatch){
    throw new Error('Unable to login!')
  }
  // if user was found
  return user
}

// hash the plain text password before saving
userSchema.pre('save', async function(next) {
  const user = this  // accessing the model using "this"
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 8)
  }
  next() // passes execution to next middleware if any
})

const User = mongoose.model('User', userSchema);

module.exports = User;