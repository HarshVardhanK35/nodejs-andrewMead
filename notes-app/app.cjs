const yargs = require('yargs')
const chalk = require('chalk')

const getNotes = require('./notes');

// Now you can use chalk to apply colors and styles to your console output
console.log(chalk.green.bold('SUCCESS'));

console.log(process.argv)
// const command = process.argv[2]

console.log(yargs.argv)