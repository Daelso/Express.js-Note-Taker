const express = require('express');
const app = express()

const uuid = require('./helpers/uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('Develop/public'));



const PORT = 3001
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);