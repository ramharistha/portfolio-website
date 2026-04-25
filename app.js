require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const User = require("./models/Item");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Not Loaded");
console.log("Trying to connect to MongoDB...");

// Routes

// Show all
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.render("index", { items: users });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching items");
  }
});

// Add page
app.get("/add", (req, res) => {
  res.render("add");
});

// Add user
app.post("/add", async (req, res) => {
  try {
    await User.create(req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding item");
  }
});

// Edit page
app.get("/edit/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("edit", { item: user });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error loading edit page");
  }
});

// Update
app.put("/edit/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error updating item");
  }
});

// Delete
app.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting item");
  }
});

// MongoDB connection + server start
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`); // But use localhost:300 in browser because 0.0.0.0 doesn't work in browser
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:");
    console.log(err);
  });

module.exports = app;