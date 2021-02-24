// Creation of an express js router for this module 
const express = require('express');
const Book = require('../models/BookModel');
const BookControl = require('../controllers/BookController')
const router = express.Router();

// see all messages
router.get('/', BookControl.book_display)

// search messages containing ElementSearch in the message field (query)
.get('/search', BookControl.book_search)

// display form
.get('/form', BookControl.book_show)

// delete chosen message with ID (parameters)
.get('/delete/:id', BookControl.book_delete)

// display modifications form from a chosen message with ID (parameters)
.get('/update/:id', BookControl.book_modify_form)

// see a chosen message with ID (parameters)
.get('/:id', BookControl.book_search_id)

// add a message (query)
.post('/', BookControl.book_add)

// modify a chosen message
.post('/update', BookControl.book_modify)

//Considerer le fichier en temps que routeur
module.exports = router ;