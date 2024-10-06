const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

// Create Like
router.post('/', likeController.createLike);

// Get All Likes
router.get('/', likeController.getAllLikes);

// Get Likes by Post ID
router.get('/post/:postId', likeController.getLikesByPostId);

// Delete Like
router.delete('/:userId/:postId', likeController.deleteLike);

module.exports = router;
