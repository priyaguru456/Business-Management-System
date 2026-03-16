const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }); // latest orders first
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add new order (when customer orders a product)
router.post("/", async (req, res) => {
  try {
    const { customerName, customerEmail, productName, quantity } = req.body;

    if (!customerName || !customerEmail || !productName || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({ customerName, customerEmail, productName, quantity });
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error adding order:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update order status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.json(updatedOrder);
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete order
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;