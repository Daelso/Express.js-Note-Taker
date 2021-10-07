const express = require('express');
const app = express();
const path = require('path');
const db = require("./Develop/db/db.json")
const fs = require("fs");

const uuid = require('./helpers/uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('Develop/public'));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);

app.get('/api/notes', (req, res) =>
res.status(200).json(db));


app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    const newNote = {
        note:req.body,
        id: uuid(),
    }

    console.log(newNote)

    const jsonthatNOTE = JSON.stringify(newNote)

    fs.writeFile("Develop/db/db.json", jsonthatNOTE, (err) => {
        if (err) console.log(err);
        else {
          console.log("Note successfully saved to db.json");
        }
      });

})


const PORT = 3001
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);