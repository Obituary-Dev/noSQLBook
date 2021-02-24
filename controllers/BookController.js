// use of mongoose model declared here 
const Book = require('../models/BookModel');

const book_display = (req, res) => {
    Book.find()
        .then((books) => {
            console.log(books, "---------------------------");
            res.render('display', { books });
        })
        .catch((err) => {
            console.log(err);
        })
}

const book_search = (req, res) => {
    let critere = '%' + req.query.msgSearch + '%' //query. Exemple : %you%
    console.log("Find this: " + filter)
    Book.find(filter)
        .then((books) => {
            console.log(books);
            res.render('display', { books });
        })
        .catch((err) => {
            console.log(err);
        })
}

const book_search_id = (req, res) => {
    let filter = req.params.id
    console.log("ID = " + filter)
    Book.find({ _id: filter })
        .then((books) => {
            console.log("value:", books);
            res.render('display', { books });
        })
        .catch((err) => {
            console.log(err);
        })
}

const book_modify = (req, res) => {
    const id = req.body.id
    console.log(id);
    const msgName = req.body.name;
    const msgMsg = req.body.msg;
    Book.findOne({ _id: id })
        .then((book) => {
            book.message = msgMsg;
            book.name = msgName;
            book.save();
        })
        .then(() => {
            res.redirect("/Book");
        })
        .catch((err) => {
            console.log(err);
        });
}

const book_delete = (req, res) => {
    const id = req.params.id;
    Book.deleteOne({ _id: id })
      .then((book) => {
        res.redirect("/Book");
      })
      .catch((err) => {
        console.log(err);
      });
  };

const book_add = (req, res) => {
    console.log("Book add")
    let msgID = req.body.id
    let msgName = req.body.name
    let msgMsg = req.body.msg
    let msgNote = req.body.evaluation

    console.log(`Adding msg ID ${msgID} from ${msgName} containing ${msgMsg} and marked ${msgNote}`);
    //Creation of a new comment Book object
    const commentBook = new Book(
        {
            id: msgID,
            evaluation: msgNote,
            message: msgMsg,
            name: msgName
        }
    );
    console.log("Sending: " + commentBook)
    commentBook.save()
        .then(() => {
            console.log("Insertion finished correctly");
            res.redirect("/Book");
        })
        .catch((err) => {
            console.log(err)
        })
}

const book_show = (req, res) => {
    res.render('form');
}

const book_modify_form = (req, res) => {
    const id = req.params.id;
    Book.findOne({ _id: id })
      .then((book) => {
        res.render("modify", { book : book });
      })
      .catch((err) => {
        console.log(err);
      });
  };

module.exports = {
    book_display,
    book_search,
    book_search_id,
    book_show,
    book_delete,
    book_add,
    book_modify,
    book_modify_form
}
