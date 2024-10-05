const express = require('express');
const router = express.Router();
const LikeController = require('../controllers/LikeController');

// Create Like
router.post('/', LikeController.createLike);

// Get All Likes
router.get('/', LikeController.getAllLikes);

// Get Like by ID
router.get('/:id', LikeController.getLikeById);

// Delete Like
router.delete('/:id', LikeController.deleteLike);

module.exports = router;
