const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Create Admin
router.post('/', adminController.createAdmin);

// Get All Admins
router.get('/', adminController.getAllAdmins);

// Get Admin by ID
router.get('/:id', adminController.getAdminById);

// Update Admin
router.put('/:id', adminController.updateAdmin);

// Delete Admin
router.delete('/:id', adminController.deleteAdmin);

module.exports = router;
