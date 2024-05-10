require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('663dca463325276681873294')
// .then((res) => {
//   console.log(res)
//   return Task.countDocuments({ completed: false })
// })
// .then((res) => {
//   console.log(res)
// })
// .catch((err) => {
//   console.log(err)
// })

const deleteAndCount = async(id) => {
  const deleteTask = await Task.findByIdAndDelete(id);
  const countTasks = await Task.countDocuments({ completed: false })
  return (deleteTask, countTasks)
}
deleteAndCount('663dc9de332527668187328e')
.then((count) => {
  console.log(count)
})
.catch((err) => {
  console.log(err)
})