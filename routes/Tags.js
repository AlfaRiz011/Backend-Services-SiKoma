const express = require('express');
const router = express.Router();
const tagController = require('../controllers/TagsController');  

// Route untuk membuat tag
router.post('/', tagController.createTag);

// Get All Tag
router.post('/', tagController.getAllTag);

// Route untuk mendapatkan semua tag berdasarkan postId
router.get('/:postId', tagController.getTagsByPostId);

// Post TagPost
router.get('/:postId', tagController.postTagPost);

module.exports = router;
