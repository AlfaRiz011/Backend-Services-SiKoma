const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController');

router.post('/', RegisterController.register);

router.post('/request-otp', RegisterController.requestOtp);

router.post('/verify-otp', RegisterController.verifyOtp);


module.exports = router;
