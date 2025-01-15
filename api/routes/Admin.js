const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const upload = require('../middlewares/uploadMiddleware');

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

// Upload Profile Picture for Admin
router.put('/:id/profile-pic', upload.single('profile_pic'), adminController.uploadAdminImage);

module.exports = router;
