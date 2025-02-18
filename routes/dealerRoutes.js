// routes/dealerRoutes.js

const express = require("express");
const router = express.Router();
const dealerController = require("../controllers/dealerController"); // Import the controller

// POST route to handle the dealership application form submission
router.post("/submit-dealer-application", dealerController.submitDealerApplication);

module.exports = router;
