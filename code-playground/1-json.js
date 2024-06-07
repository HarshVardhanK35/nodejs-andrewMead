const fs = require("fs");

// const book = {
//   title: "I die my die... why are you?",
//   author: "mine"
// }

// convert into JSON stringify
// const objJSON = JSON.stringify(book)    // result: {"title":"I die my die... why are you?","author":"mine"}

// convert JSON string into normal object using "parse"
// const parsedJSON = JSON.parse(objJSON)    // result: { title: 'I die my die... why are you?', author: 'mine' }

// ---------------------------------------------------------------------------------------------------------------------

// Using FS-module to create a file and store the JSON data
// fs.writeFileSync('1-json.json', objJSON);

// to read data from the file using FS-module
// const bufferedData = fs.readFileSync('1-json.json')
// const dataJSON = bufferedData.toString()
// const data = JSON.parse(dataJSON)

// console.log(data)



// ---------------------------------------------------------- Challenge----------------------------------------------------------
const bufferedData = fs.readFileSync('1-json.json')
const dataJSON = bufferedData.toString()
const data = JSON.parse(dataJSON)

// data.name = 'Jane Doe'
// data.age = 23

// const modifiedData = JSON.stringify(data)
// fs.writeFileSync('1-json.json', modifiedData)

console.log(dataJSON)