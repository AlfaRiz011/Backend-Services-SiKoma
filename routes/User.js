const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Create User
router.post('/', UserController.createUser);

// Get All Users
router.get('/', UserController.getAllUsers);

// Get User by ID
router.get('/:id', UserController.getUserById);

// Update User
router.put('/:id', UserController.updateUser);

// Delete User
router.delete('/:id', UserController.deleteUser);

module.exports = router;
