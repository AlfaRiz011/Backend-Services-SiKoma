const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagsController'); // Pastikan path sesuai dengan lokasi kontroler Anda

// Route untuk membuat tag
router.post('/', tagController.createTag);

// Route untuk mendapatkan semua tag berdasarkan postId
router.get('/:postId', tagController.getTagsByPostId);

module.exports = router;
