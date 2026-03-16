const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ["Pending", "Completed", "Shipped", "Cancelled"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);