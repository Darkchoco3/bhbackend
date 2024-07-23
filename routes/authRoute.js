const express = require('express');
const { registration, login } = require('../Controllers/authController');
const router = express.Router();

// Registration route
router.post('/register', registration);

// Login route
router.post('/login', login);

module.exports = router;
