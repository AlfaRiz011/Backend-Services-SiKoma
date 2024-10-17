const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');

// Route untuk registrasi user
router.post('/', RegisterController.register);

// Route untuk verifikasi OTP
router.post('/verify-otp', RegisterController.verifyOtp);

module.exports = router;
