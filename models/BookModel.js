// Mongoose module with database diagram
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Creation of database diagram
const BookSchema = new Schema({
    id: {type: Number, required:true},
    evaluation: {type: String, required:true},
    message: {type: String, required:true},
    name: {type: String, required:true},
}, {timestamp: true});

//Creation of a model based on the diagram and exportation of the function
const Book = mongoose.model('Book', BookSchema);
module.exports = Book;