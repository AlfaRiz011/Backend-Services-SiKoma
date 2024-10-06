const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Create Post
router.post('/', postController.createPost);

// Get All Posts
router.get('/', postController.getAllPosts);

// Get Post by ID
router.get('/:postId', postController.getPostById);

// Get Posts by Type (Events)
router.get('/events', postController.getPostsEvents);

// Update Post
router.put('/:postId', postController.updatePost);

// Delete Post
router.delete('/:postId', postController.deletePost);

module.exports = router;
