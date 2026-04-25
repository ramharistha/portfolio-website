const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

module.exports = mongoose.model("User", itemSchema, "users");