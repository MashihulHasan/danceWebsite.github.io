
const express = require('express');
const path = require('path');
const fs = require("fs");
const app = express();
var mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost/contactDance');
}
const bodyparser = require('body-parser');
const port = 8000;

//Define mongoose schem
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String

});

var Contact = mongoose.model('Contact', contactSchema);

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

app.post('/contact', (req, res) => {
    var mydata = new Contact(req.body);
    mydata.save().then(() => {
        res.send("this item has been saved in database");
    }).catch(() => {
        res.status(400).send("item was not saved to database");
    });
    // res.status(200).render('contact.pug');
});

//Start the Server.
app.listen(port, () => {
    console.log(`The application strated at port:${port}`);
});