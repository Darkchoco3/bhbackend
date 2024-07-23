const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Registration endpoint
const registration = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (firstName, lastName, email, password) are required to register.",
      });
    }

    // Check if email is already registered
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email address already in use.",
      });
    }

    // Create new user
    const newUser = await User.create({ firstName, lastName, email, password });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return success response with token and user details
    res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Login endpoint
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required to login.",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return success response with token and user details
    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
      },
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = { registration, login };
