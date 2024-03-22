const yargs = require('yargs')
const chalk = require('chalk')

const notesFunctions = require('./notes');

// create an Add command
yargs.command({
  command: 'add',
  describe: 'Adds a new note',
  builder:{
    title:{
      demandOption: true, // title option is strictly required
      type: "string" // expecting a string always for title
    },
    body:{
      demandOption: true,
      type: 'string'
    }
  },
  handler: function(argv){
    notesFunctions.addNotes(argv.title, argv.body)
  }
})

// create an Remove command
yargs.command({
  command: 'remove',
  builder:{
    title:{
      demandOption: true,
      type: "string"
    }
  },
  handler: function(argv){
    notesFunctions.removeNotes(argv.title)
  }
})

// create an Read command
yargs.command({
  command: 'read',
  handler: notesFunctions.listNotes()
})

// create an add command
yargs.command({
  command: 'list',
  handler: function(){
    console.log('Listing all the notes')
  }
})

yargs.parse() // instead of console.log(yargs.argv)