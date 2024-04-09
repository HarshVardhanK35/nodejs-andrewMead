// setTimeout(()=>{
//   console.log("Two seconds are up!")
// }, 2000)

// const geocode = (address, callback) => {
//   setTimeout(()=>{
//     const data = {
//       lat: 0,
//       long: 0
//     }
//     callback(data)
//   }, 2000)
// }

// geocode('London', (data) => {
//   console.log(data)
// })

// ---------------------------- Challenge ----------------------------

// Challenge: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const cube = (a, b, cb) => {
  setTimeout(() => {
    const square = a * b;
    cb(square)
  }, 2000)
}
cube(2, 2, (square) => {
  const res = square * 2;
  console.log(res)
})