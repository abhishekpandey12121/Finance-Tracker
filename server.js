require("dotenv").config();
const express = require("express");
const User = require("C:/Users/abhishek pandey/Documents/WEB DEVELOPMENT/finance-manager/backend/models/User"); // Import User Model
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// Define Finance Schema & Model (User Model is already imported)
const FinanceSchema = new mongoose.Schema({
  userId: String,
  type: String, // income or expense
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now },
});
const Finance = mongoose.model("Finance", FinanceSchema);

// Authentication Routes
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;  
  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


// Finance Routes
app.post("/finance", async (req, res) => {
  const { userId, type, amount, category } = req.body;
  try {
  const transaction = await Finance.create({ userId, type, amount, category });
  io.emit("finance_update", transaction);
  res.json(transaction);
} catch (err) {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
}
});

app.get("/finance/:userId", async (req, res) => {
  try {
  const transactions = await Finance.find({ userId: req.params.userId });
  res.json(transactions);
} catch (err) {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
}
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
