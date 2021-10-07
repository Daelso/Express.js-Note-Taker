const express = require('express');
const app = express();
const path = require('path');
const db = require("./Develop/db/db.json")
const fs = require("fs");

const uuid = require('./helpers/uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('Develop/public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
res.status(200).json(db));


app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./Develop/db/db.json", "utf8"));

    //create new property called id based on length and assign it to each json object
    newNote.id = uuid();
    //push updated note to the data containing notes history in db.json
    noteList.push(newNote);

    //write the updated data to db.json
    fs.writeFileSync("./Develop/db/db.json", JSON.stringify(noteList));
    res.json(noteList);

})


const PORT = 3001
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);