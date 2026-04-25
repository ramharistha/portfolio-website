require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

const Item = require("./models/Item");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Not Loaded");
console.log("Trying to connect to MongoDB...");

// Routes

// Show all items
app.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.render("index", { items });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching items");
  }
});

// Show add page
app.get("/add", (req, res) => {
  res.render("add");
});

// Add new item
app.post("/add", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    const newItem = new Item({
      name,
      email,
      age,
    });

    await newItem.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error adding item");
  }
});

// Show edit page
app.get("/edit/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.render("edit", { item });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error loading edit page");
  }
});

// Update item
app.put("/edit/:id", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    await Item.findByIdAndUpdate(req.params.id, {
      name,
      email,
      age,
    });

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating item");
  }
});

// Delete item
app.delete("/delete/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
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
      console.log(`Server running on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:");
    console.log(err);
  });
=======

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

console.log("Trying to connect to MongoDB...");

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log("MongoDB Connected");

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.log("MongoDB connection error:");
  console.log(err);
});

app.get("/", (req, res) => {
  res.send("Backend is working");
});
>>>>>>> b9a12c6fb2d710c2bd9954f030fc3ff89adbe952
