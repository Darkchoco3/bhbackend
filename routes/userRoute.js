const express = require("express");
const router = express.Router();
const { registration, login } = require('../Controllers/authController');

// Registration route
router.post('/register', registration);

// Login route
router.post('/login', login);

module.exports = router;
