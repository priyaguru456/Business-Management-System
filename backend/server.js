const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const customerRoutes = require("./routes/customerRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orders");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);



app.get("/", (req, res) => {
  res.send("BMS API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});