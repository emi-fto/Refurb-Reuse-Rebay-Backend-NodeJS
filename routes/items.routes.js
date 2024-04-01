const Item = require("../models/Item.model");
const router = require("express").Router();

// Get all items
router.get("/", async (req, res) => {
  const query = req.query.q; // Retrieve the value of the 'q' query parameter
  try {
    let itemsByNameOrCategory;
    if (query) {
      // If a search query is provided, filter items by name or category using a regular expression
      itemsByNameOrCategory = await Item.find({
        $or: [
          { name: { $regex: new RegExp(query, "i") } },
          { category: { $regex: new RegExp(query, "i") } },
        ],
      });
      res.status(200).json(itemsByNameOrCategory);
    } else {
      const allItems = await Item.find();
      res.status(200).json(allItems);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the items" });
  }
});

// Get one item
router.get("/:itemId", async (req, res) => {
  const { itemId } = req.params;
  try {
    const oneItem = await Item.findById(itemId);
    res.status(200).json(oneItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while getting the item" });
  }
});

// Create a new item
router.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const newItem = await Item.create(payload);
    res.status(201).json(newItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while creating the item" });
  }
});

// Edit one item
router.put("/:itemId", async (req, res) => {
  const payload = req.body;
  const { itemId } = req.params;
  try {
    const updatedItem = await Item.findByIdAndUpdate(itemId, payload, {
      new: true,
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while updating the item" });
  }
});

// Delete one trip
router.delete("/:itemId", async (req, res) => {
  const { itemId } = req.params;
  try {
    await Item.findByIdAndDelete(itemId);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: "error while deleting the item" });
  }
});

module.exports = router;
