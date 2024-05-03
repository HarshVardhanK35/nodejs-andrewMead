const workOnPromise = new Promise((resolve, reject) => {
  setTimeout(()=>{
    reject("something went wrong!")
  }, 2000)
})

workOnPromise
.then((result) => {
  console.log(result)
})
.catch((error) => {
  console.log(error)
})


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

