require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

// database connection
(async () => {
  try {
    await connection();
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1); // Exit process with failure
  }
})();

// middlewares
app.use(express.json());
app.use(cors());

console.log("USER ROUTES", userRoutes);
console.log("AUTH ROUTES", authRoutes);

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
