// server.js
require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const emailRoutes = require("./routes/contactRoutes");
const dealerRoutes = require("./routes/dealerRoutes");

const app = express();
const port = 3000;

// Middleware to handle CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local development URL
      "https://maxtronev.com", // Production URL 1
      "http://147.93.19.84:3000", // Production URL 2
    ],
  })
);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the email routes
app.use("/api/email", emailRoutes);
app.use("/api/dealer", dealerRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
