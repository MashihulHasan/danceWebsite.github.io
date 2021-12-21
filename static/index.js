
const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();
const port = 8000;

// app.use(express.static('static', options))
//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));//for seving static files.
app.use(express.urlencoded());

//PUG SPECIF STUFF
app.set('view engine', 'pug');//set the template engine as pug.
app.set('views', path.join(__dirname, 'views'));//set the views directory.

//Endpoint.
app.get('/', (req, res) => {
    const con = 'This is the best content on the internent';
    const params = {}
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const con = 'This is the best content on the internent';
    const params = {}
    res.status(200).render('contact.pug', params);
});


//Start the Server.
app.listen(port, () => {
    console.log(`The application strated at port:${port}`);
});