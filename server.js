const express = require('express');
const app = express();
const port =3000;

app.use('/', express.static('public'));

const data = require("./budget.json");

app.get ('/hello', (req, res) => {
    res.send('hello World!');
});

app.get ('/budget', (req, res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Example app listen at http://localhost:${port}`)
});