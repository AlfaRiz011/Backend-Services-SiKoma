const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Create Admin
router.post('/', adminController.createAdmin);

// Get All Admins
router.get('/', adminController.getAllAdmins);

// Get  Admins by Name
router.get('/find', adminController.getAdminByName);

// Get Admin by ID
router.get('/:id', adminController.getAdminById);

// Update Admin
router.put('/:id', adminController.updateAdmin); 

module.exports = router;
