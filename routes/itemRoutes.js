const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

// Home page - show all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.render("index", { items });
  } catch (error) {
    res.status(500).send("Error fetching items");
  }
});

// Show add form
router.get("/add", (req, res) => {
  res.render("add");
});

// Create item
router.post("/add", async (req, res) => {
  try {
    await Item.create({ name: req.body.name });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error adding item");
  }
});

// Show edit form
router.get("/edit/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.render("edit", { item });
  } catch (error) {
    res.status(500).send("Error loading edit page");
  }
});

// Update item
router.put("/edit/:id", async (req, res) => {
  try {
    await Item.findByIdAndUpdate(req.params.id, {
      name: req.body.name
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error updating item");
  }
});

// Delete item
router.delete("/delete/:id", async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting item");
  }
});

module.exports = router;