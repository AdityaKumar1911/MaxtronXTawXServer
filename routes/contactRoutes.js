// routes/emailRoutes.js
const express = require("express");
const { sendEmail } = require("../controllers/contactController");

const router = express.Router();

// POST route to handle email sending
router.post("/send-email", sendEmail);

module.exports = router;
