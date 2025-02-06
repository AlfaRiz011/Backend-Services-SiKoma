const express = require('express');
const router = express.Router();
const RegisterController = require('../controllers/RegisterController.js');

router.get('/check', RegisterController.checkUser);

router.post('/', RegisterController.register);

module.exports = router;
