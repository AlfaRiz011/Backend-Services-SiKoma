const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const upload = require('../middlewares/uploadMiddleware');
 
// Get All Users
router.get('/', UserController.getAllUsers);

// Get User by ID
router.get('/:id', UserController.getUserById);

// Get User by Email
router.get('/email', UserController.getUserByEmail);

// Update User
router.put('/:id', UserController.updateUser);

// Update User Profile Picture
router.put('/:id/profile-pic', upload.single('profile_pic'), UserController.updateProfilePic);

module.exports = router;
