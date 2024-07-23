const express = require('express');
const { registration, login, getUserName} = require('../Controllers/authController');
const router = express.Router();
// const authMiddleWare = require('../middleware/auth')
// registration route

router.post('/register', registration);

//login route
router.post('/login', login)

// get username
router.get('/getusername',getUserName)
// isloggedin
// router.get('/isloggedin', isLoggedIn)
// forgot password
// router.post('/forgotpassword',forgotPassword);

// reset password ftn
// router.put('/resetpassword/:resetToken',resetPassword);

module.exports = router;