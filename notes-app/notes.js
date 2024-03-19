const fs = require("fs");

function getNotes() {
  return "Your notes...";
}

function addNotes(title, body) {
  const notes = loadNotes();

  notes.push({
    title: title,
    body: body,
  });

  saveNotes(notes)
}

function saveNotes(notes){
  const notesJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', notesJSON)
}

function loadNotes() {
  try {
    const notesBuffer = fs.readFileSync("notes.json");
    const notesJSON = notesBuffer.toString();
    const parsedNotes = JSON.parse(notesJSON);
    return parsedNotes
  }
  catch (err) {
    return [];
  }
}

const res = loadNotes()
console.log(res)

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
};
