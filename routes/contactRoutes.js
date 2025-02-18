const express = require('express');
const { sendContactEmail } = require('../controllers/contactController');
const router = express.Router();

// POST endpoint for the contact form
router.post('/', sendContactEmail);

module.exports = router;
