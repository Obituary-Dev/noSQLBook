// include dependencies and middlewares
const mysql = require('mysql');
const ejs = require('ejs');
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/BookModel');
const Router = require('./routes/BookRoute');
const bodyparser = require('body-parser');
let iniparser = require('iniparser');

// Retrieve settings
let configDB = iniparser.parseSync('./DB.ini');
let host = configDB['dev']['host'];
let user = configDB['dev']['user'];
let password = configDB['dev']['password'];
let database = configDB['dev']['database'];
// Prepare noSQL database connection
const uri = `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority`;

// activate les dependencies
let app = express()
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.static('public'));

// activate middleware and launch app on :3000
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());
//app.listen(3000, () => console.log('le serveur Livre d\'Or est prêt.'));

// Book routes 
app.use('/Book', Router);

// Activate asynchronous connection to noSQL database (promise)
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    app.listen(3000, () => console.log(`SRV : the book server (noSQL) is now ready.`))
})
    .catch((err) => { console.log(err) })
console.log(`DB : distant noSQL database is now ready.`)

// Page 404 a créer
app.use((req, res) => {
    res.status(404).render('404NOTFOUND')
});