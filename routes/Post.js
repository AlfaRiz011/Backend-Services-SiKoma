const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');

// Create Post
router.post('/:adminId', postController.createPost);

// Delete Post
router.delete('/:postId', postController.deletePost);

// Get All Posts
router.get('/', postController.getAllPosts);

// Get Post by ID
router.get('/:postId', postController.getPostById);

// Get Post by AdminID
router.get('/:adminId', postController.getPostByAdminId);

// Get Recommendation Post
router.get('/recommendation/:id', postController.getRecommendationPost);

// Get Posts by Type (Events)
router.get('/', postController.getPostsEvents);

// Get Posts by Type (Events) and Admin ID
router.get('/', postController.getPostsEventsAdmin);

// Update Post
router.put('/:postId', postController.updatePost);

// Like Post
router.post('/:userId', postController.likePost);

module.exports = router;
