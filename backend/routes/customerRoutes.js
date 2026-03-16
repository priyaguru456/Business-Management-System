const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

// GET all customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add a customer
router.post("/", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const customer = new Customer({ name, email, phone });
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a customer
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a customer
router.delete("/:id", async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;