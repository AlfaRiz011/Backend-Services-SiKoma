const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

// Create Admin
router.post('/', AdminController.createAdmin);

// Get All Admins
router.get('/', AdminController.getAllAdmins);

// Get Admin by ID
router.get('/:id', AdminController.getAdminById);

// Update Admin
router.put('/:id', AdminController.updateAdmin);

// Delete Admin
router.delete('/:id', AdminController.deleteAdmin);

module.exports = router;
