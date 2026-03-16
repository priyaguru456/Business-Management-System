const express = require("express");
const router = express.Router();
const User = require("../models/User"); // your mongoose schema

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Add new user
router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete user
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;