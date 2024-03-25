const fs = require("fs");
const chalk = require("chalk")

const getNotes = () => {
  return "Your notes...";
}

// Add notes
const addNotes = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => {
    return note.title === title
  })

  if(!duplicateNote){
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);

    console.log(chalk.inverse.green("Note added successfully"))
  }
  else{
    console.log(chalk.inverse.red(`Note's title has been taken already!`))
  }
}

// remove notes
const removeNotes = (title) => {
  const notes = loadNotes()

  const notesChosen = notes.filter((note) => {
    return note.title !== title
  })

  if(notes.length > notesChosen.length){
    console.log(chalk.inverse.green("Notes removed"))

    saveNotes(notesChosen)
  }
  else{
    console.log(chalk.inverse.red("Notes not found"))
  }
}

// list notes
const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.inverse.blue("Your notes are listed below..."))

  notes.forEach((note)=>{
    console.log(note.title)
  })
}

// Read notes
const readNotes = (title)=>{
  const notes = loadNotes()

  const note = notes.find((note) => {
    return note.title === title
  })

  if(note){
    console.log(chalk.inverse(note.title))
    console.log(note.body)
  }
  else{
    console.log(chalk.inverse.red(`Note not found!`))
  }
}

function loadNotes() {
  try {
    const notesBuffer = fs.readFileSync("notes.json");
    const notesJSON = notesBuffer.toString();
    return JSON.parse(notesJSON);
  }
  catch (err) {
    return [];
  }
}

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', notesJSON)
}


module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNotes: readNotes
};