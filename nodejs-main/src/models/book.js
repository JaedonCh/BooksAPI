//Schema for the books table that defines the different properties for each book
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  numOfPages: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Book", bookSchema);
