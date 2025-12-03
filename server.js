// server.js
require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const emailRoutes = require("./routes/contactRoutes");
const dealerRoutes = require("./routes/dealerRoutes");
const https = require("https");
const fs = require("fs");

const app = express();
const port = 3000;

// Middleware to handle CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://maxtronev.com",
      "https://behalf-sensors-groundwater-supplemental.trycloudflare.com"
    ],
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    credentials: true,
  })
);


// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the email routes
app.use("/api/email", emailRoutes);
app.use("/api/dealer", dealerRoutes);

// HTTPS options - self-signed certificate
const options = {
  key: fs.readFileSync("/etc/ssl/selfsigned/server.key"),      // path to your key
  cert: fs.readFileSync("/etc/ssl/selfsigned/server.crt"),     // path to your cert
};

// Start HTTPS server
https.createServer(options, app).listen(port, () => {
  console.log(`✅ HTTPS Server running at https://147.93.19.84:${port}`);
});
