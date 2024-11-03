const express = require('express');
const router = express.Router();
const postController = require('../controllers/PostController');
const upload = require('../middlewares/uploadMiddleware');

// Create Post
router.post('/:adminId', upload.single('image'), postController.createPost);

// Delete Post
router.delete('/:postId', postController.deletePost);

// Get All Posts
router.get('/', postController.getAllPosts);

// Get Post by ID
router.get('/:postId', postController.getPostById);

// Get Post by AdminID
router.get('/admin/:adminId', postController.getPostByAdminId);

// Get Recommendation Post
router.get('/recommendation/:id', postController.getRecommendationPost);

// Get Posts by Type (Events)
router.get('/event/event', postController.getPostsEvents);

// Get Posts by Type (Events) and Admin ID
router.get('/event/admin/:adminId', postController.getPostsEventsAdmin);

// Update Post
router.put('/:postId', upload.single('image'), postController.updatePost);

// Like Post
router.post('/like/:userId', postController.likePost);

module.exports = router;
