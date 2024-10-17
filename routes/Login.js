// routes/auth.js
const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');

// Route untuk login
router.post('/', LoginController.login);

module.exports = router;