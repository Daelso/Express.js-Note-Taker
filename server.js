const express = require('express');
const app = express()
const path = require('path');

const uuid = require('./helpers/uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('Develop/public'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);

const PORT = 3001
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);