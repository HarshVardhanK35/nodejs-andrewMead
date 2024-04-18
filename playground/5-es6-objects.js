// 5-es6-objects.js


// -------------------------- Object property shorthand --------------------------
// _______________________________________________________
// 1. Old-syntax

const userName = "John";
const userAge = 23;

// const user = {
//   name: userName,
//   age: userAge,
//   location: 'India'
// }
// console.log(user)

// _______________________________________________________
// 2. Object property shorthand syntax

const user = {
  userName,
  userAge,
  location: 'India'
}
// console.log(user)

// -------------------------- Object destructuring syntax --------------------------
// -> extract object properties and their values into individual variables

const product = {
  label: "white notes",
  price: 35,
  stock: 250,
  salePrice: undefined
}
// 1. older syntax --- extracting object's values
// const label = product.label;

// 2. destructuring syntax ---
      //-> rename => label: productLabel;
      //-> default value if there is no certain property in that object => rating = 5
// const {label: productLabel, price, rating = 5, ...otherDetails} = product;
// console.log(rating)

// -------------------------- destructuring inside a function --------------------------
const products = {
  label: "white notes",
  price: 35,
  stock: 250,
  salePrice: undefined
}
const transaction = (transactionType, { label, price, stock= 0} = {}) => {
  console.log(transactionType, label, stock)
}
transaction('order')