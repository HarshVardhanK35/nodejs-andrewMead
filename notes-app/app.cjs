const yargs = require('yargs')
const chalk = require('chalk')

const getNotes = require('./notes');

// create an Add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder:{
    title:{
      demandOption: true, // title option is strictly required
      type: 'string' // expecting a string always for title
    },
    body:{
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv){
    console.log(`Title: ${argv.title} \nBody: ${argv.body}`)
  }
})

// create an Remove command
yargs.command({
  command: 'remove',
  handler: function(){
    console.log('Removing a note')
  }
})

// create an Read command
yargs.command({
  command: 'read',
  handler: function(){
    console.log('Reading a note')
  }
})

// create an add command
yargs.command({
  command: 'list',
  handler: function(){
    console.log('Listing all the notes')
  }
})

yargs.parse() // instead of console.log(yargs.argv)

