// import mongoose for connecting to DB
require('../src/db/mongoose');

// import User model too
const User = require('../src/models/user')

/*
 * lets change age of one user and fetch the same aged users
 * grab a mongoose method that update the fields inside database
*/

// notice that we are not using the $set operator that we used before with mongodb because mongoose takes care of it

// User.findByIdAndUpdate('6639a624578d552f5741cf56', { age: 14 })
// .then((user) => {
//   console.log(user)
//   return User.countDocuments({ age: 13 })     // we can explore more methods in mongoose under API/Model docs
// })
// .then((users) => {
//   console.log(users)
// })
// .catch((err) => {
//   console.log(err)
// })


const updateAgeAndCount = async(id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: age })
  const count = await User.countDocuments({ age: age })
  return count
}
updateAgeAndCount('663df999bd33d51f5efb86e6', 14)
.then((count) => {
  console.log(count)
})
.catch((err) => {
  console.log(err)
})