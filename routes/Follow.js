const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');

// follow Admin
router.post('/:userId', followController.followAdmin);

// follow Tag
router.post('/:userId', followController.followTag);

// Get All follow Admin
router.post('/admin/:userId', followController.getFollowAdmin);

// Get All follow Tag
router.post('/tag/:userId', followController.getFollowTag);

module.exports = router;
