const yargs = require("yargs");
const chalk = require("chalk");

const notesFunctions = require("./notes");

// create an Add command
yargs.command({
  command: "add",
  describe: "Adds a new note",
  builder: {
    title: {
      demandOption: true, // title option is strictly required
      type: "string", // expecting a string always for title
    },
    body: {
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notesFunctions.addNotes(argv.title, argv.body);
  },
});

// create Remove command
yargs.command({
  command: "remove",
  describe: "Removes a new note",
  builder: {
    title: {
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notesFunctions.removeNotes(argv.title);
  },
});

// create list command
yargs.command({
  command: "list",
  describe: "Lists all the notes",
  handler() {
    notesFunctions.listNotes();
  },
});

// create an delete command
yargs.command({
  command: "read",
  describe: "Reads the note",
  builder: {
    title: {
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notesFunctions.readNotes(argv.title);
  },
});

yargs.parse(); // instead of console.log(yargs.argv)
