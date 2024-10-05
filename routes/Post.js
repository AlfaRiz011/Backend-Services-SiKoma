const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

// Create Post
router.post('/', PostController.createPost);

// Get All Posts
router.get('/', PostController.getAllPosts);

// Get Post by ID
router.get('/:id', PostController.getPostById);

// Update Post
router.put('/:id', PostController.updatePost);

// Delete Post
router.delete('/:id', PostController.deletePost);

module.exports = router;
