// const workOnPromise = new Promise((resolve, reject) => {
//   setTimeout(()=>{
//     reject("something went wrong!")
//   }, 2000)
// })

// workOnPromise
// .then((result) => {
//   console.log(result)
// })
// .catch((error) => {
//   console.log(error)
// })


/*
 * we do not create promises like this but they are created by the libraries we use in development
 *
 * Note:
 * In promises, we can call either resolve or reject functions (we can't call both or can't call one function twice)
 * Once one of them is called the value or state of promise can not change
 * But with callback pattern we can call a callback twice that can be an error or a resolved result
 *
 *                            -> fulfilled (resolved)
 *                          /
 * promise --- pending --->
 *                          \
 *                             -> rejected
 *
 * our promise is pending for two seconds until either resolve or reject is executed
 *  -> if resolve is called promise is fulfilled.
 *  -> if reject is called promise is rejected.
*/

// Multiple Asynchronous Operations
// Promise Chaining

// below is single synchronous operation
const add = (a, b) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(a + b)
    }, 2000)
  })
}
add(2, 3)
.then((sum) => {
  console.log(sum)
})
.catch((err) => {
  console.log(err)
})

// so we can nest another promise inside one
add(2, 3)
.then((sum) => {
  console.log(sum)

  add(sum, 5)           // another promise nested here
  .then((sum1) => {
    console.log(sum1)
  })
  .catch((err) => {
    console.log(err)
  })
})
.catch((err) => {
  console.log(err)
})

/*
 * the above example is same as callback hell.
 * the more promises we nest in the more complex the code gets.
 * we have same code that has repeated again and again.
 * so we have promise chaining to prevent this
*/
// new syntax:
add(2, 3)                 // returns 1st promise
.then((sum1)=>{
  console.log(sum1)
  return add(sum1, 4)     // returns 2nd promise
})
.then((sum2) => {
  console.log(sum2)
})
.catch((err) => {
  console.log(err)
})


//NOTE: this is not the real-world use case so created promise-chaining inside task-manager to play with mongoose
