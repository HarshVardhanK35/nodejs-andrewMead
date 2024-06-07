// ---------------------------------------------- basic structure of asynchronous function
/**
 * ------------------ without a return value
 * we get undefined as a result normally
 * but with asynchronous functionality we get a promise fulfilled with undefined
 *    res: Promise { undefined }
*/
const doThis = async() => {

}
// console.log(doThis())


/**
 * ------------------ with a return value
 * 1. we get the return value as a result normally
 * but with asynchronous functionality we get a promise fulfilled with the specified value inside return
 *    res: Promise { < return-value > }
 *
 * 2. How we make catch to run?
 * if we throw an error from async function that means we are rejecting the promise
 * so we have to use "throw" statement { throw new Error() }
*/
const doThis1 = async() => {
  throw new Error("Something went wrong!")
  // return ("andrew")
}
doThis1().then((res) => {
  // console.log('result', res)
})
.catch((err) => {
  // console.log("err-", err)
})


// ---------------------------------------------------------------- The Await Operator
/**
 * await operator can only be used inside an asynchronous function
 * await operator needs a promise so create a dummy function that returns a promise
 * as mongoose returns promise as a result so we can use await on it.
 * so with async-await we use synch code to work with async code.
*/
const add = (a, b) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(a + b)
    }, 2000)
  })
}

// add() returns a promise so we can use await on its return value
const addResult = async() => {
  const sum = await add(1, 2);
  const sum1 = await add(sum, 3);
  return sum1
}

addResult()
.then((res) => {
  console.log(res)
})
.catch((err) => {
  console.log(err)
})

/**
 * conclusion:
 * -> we have much simpler code than promise chaining
 * -> we have problems with scope while using promise chaining (we do not have all values under same scope... but with async-await we does)
 *
 * -> as async-await handles promises in synchronous manner and if there is an error in the last line we have wait until the execution of last line
*/
const add1 = (a, b) => {
  return new Promise((res, rej) => {
    setTimeout(() => {

      if(a < 0 || b < 0) {
        return rej("Numbers must be positive")
      }
      res(a + b)

    }, 2000)
  })
}

const addResult1 = async() => {
  const sum = await add1(1, 2);
  const sum1 = await add1(sum, -3);
  return sum1
}

addResult1()
.then((res) => {
  console.log(res)
})
.catch((err) => {
  console.log(err)
})