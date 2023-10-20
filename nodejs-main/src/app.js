const express = require("express");
const mongoose = require("mongoose");

const Book = require("./models/book");
const cors = require("cors");

const app = express();
mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT || 3000;
const CONNECTION = process.env.CONNECTION;

app.get("/", (req, res) => {
  res.send("welcome!");
});

app.get("/api/allbooks", async (req, res) => {
  try {
    //tries to find all books
    const result = await Book.find();
    //sends them as json
    res.json({ books: result });
  } catch (e) {
    //sends error if unssuccessful
    res.status(500).json({ error: e.message });
  }
});

app.get("/api/allbooks/:id", async (req, res) => {
  //logging params/query
  console.log({
    requestParams: req.params,
    requestQuery: req.query,
  });
  try {
    //tries to get bookID
    const { id: bookId } = req.params;
    console.log(bookId);
    //uses findbyId method to find one particular book
    const book = await Book.findById(bookId);
    console.log(book);
    if (!book) {
      //if there is no book sends 404
      res.status(404).json({ error: "User not found" });
    } else {
      //otherwise sends book
      res.json({ book });
    }
  } catch (e) {
    //sends error if bookid try method doesnt work
    res.status(500).json({ error: "something went wrong" });
  }
});

app.put("/api/allbooks/:id", async (req, res) => {
  try {
    //tries to get bookId from req.params using id
    const bookId = req.params.id;
    //updates the record and logs the book
    const book = await Book.findOneAndReplace(
      { _id: bookId },
      req.body,
      { new: true }
    );
    console.log(book);
    //sends the book
    res.json({ book });
  } catch (e) {
    //sends error if any
    console.log(e.message);
    res.status(500).json({ error: "something went wrong" });
  }
});

app.patch("/api/allbooks/:id", async (req, res) => {
  //Does the same as the above put method but only alters the fields that were changed
  try {
    const bookId = req.params.id;
    const book = await Book.findOneAndUpdate(
      { _id: bookId },
      req.body,
      { new: true }
    );
    console.log(book);
    res.json({ book });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ error: "something went wrong" });
  }
});

app.delete("/api/allbooks/:id", async (req, res) => {
  try {
    //tries to get the book by the id
    const bookId = req.params.id;
    //deletes it
    const result = await Book.deleteOne({ _id: bookId });
    //sends back whether a book was deleted by sending the deleted count property
    res.json({ deletedCount: result.deletedCount });
  } catch (e) {
    //sends error if failed
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/api/allbooks", async (req, res) => {
  //logs the body
  console.log(req.body);
  //creates a new book from the body. which should contain all the fields neccassary to add a book to the database
  const book = new Book(req.body);
  try {
    //if it does it saves the book and sends successful message and the book back as json
    await book.save();
    res.status(201).json({ book });
  } catch (e) {
    //if not it sends an error
    res.status(400).json({ error: e.message });
  }
});

//gets connection
const start = async () => {
  try {
    await mongoose.connect(CONNECTION);//CONNECTION is the mongoose connect string

    app.listen(PORT, () => {//PORT is the localhost port
      console.log("App listening on port " + PORT);//PORT and CONNECTION variables are defined in .env file
    });
  } catch (e) {
    console.log(e.message);
  }
};

start();
