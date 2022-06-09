const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./Book");
const Book = mongoose.model("Book")

mongoose.connect(mongodb_cred, () => {
    console.log("Database is connected!");
})

app.get('/', (req, res) => {
    res.send("This is our main end point!!");
})

app.post("/book", (req, res) => {
    // console.log(req.body)
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numPages,
        publisher: req.body.publisher
    }

    var book = new Book(newBook)

    book.save().then(() => {
        console.log("New book created!")
    }).catch((err) => {
        if(err) {
            throw err;
        }
    })

    res.send("Testin route!")

})

app.get("/books", (req, res) => {
    Book.find().then((books) => {
        res.json(books)
    }).catch(err => {
        if(err) {
            throw err;
        }
    })
})

app.get("/book/:id", (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if(book){
            res.json(book)
        } else{
            res.sendStatus(404);
        }
    }).catch(err => {
        if(err) {
            throw err;
        }
    })
})

app.delete("/book/:id", (req, res) => {
    Book.findByIdAndDelete(req.params.id).then(() => {
        res.send("Book removed sucessfully!")
    }).catch(err => {
        if(err){
            throw err;
        }
    })
})



app.listen(4949, () => {
    console.log(" Up and Listening on port 4949!!");
})

