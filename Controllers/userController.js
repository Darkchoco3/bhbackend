const User = require('../model/userModel'); // Assuming your user model is defined in userModel.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Controller function for user registration
const registration = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Create new user instance
    user = new User({
      firstName,
      lastName,
      email,
      password
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to the database
    await user.save();

    // Generate JWT token
    const token = await user.generateToken();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token
      }
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// Controller function for user login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = await user.generateToken();

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token
      }
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  registration,
  login
};
