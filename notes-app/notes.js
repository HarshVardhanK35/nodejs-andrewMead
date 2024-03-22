const fs = require("fs");
const chalk = require("chalk")

function getNotes() {
  return "Your notes...";
}

// Add notes
function addNotes(title, body) {
  const notes = loadNotes();

  const duplicateNotes = notes.filter((note)=>{
    return note.title === title
  })

  if(duplicateNotes.length === 0){
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);

    console.log(chalk.inverse.green("Notes added successfully"))
  }
  else{
    console.log(chalk.inverse.red('Notes title has been taken already!'))
  }
}

// remove notes
function removeNotes(title){
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

// remove notes
const listNotes = () => {
  const notes = loadNotes()

  console.log(chalk.inverse.blue("Your notes are listed below"))

  notes.forEach((note)=>{
    console.log(note.title)
  })
}

function saveNotes(notes){
  const notesJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', notesJSON)
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

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
  listNotes: listNotes
};