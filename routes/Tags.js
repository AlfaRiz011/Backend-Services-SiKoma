const express = require('express');
const router = express.Router();
const TagController = require('../controllers/TagsController');

// Create Tag
router.post('/', TagController.createTag);

// Get All Tags
router.get('/', TagController.getAllTags);

// Get Tag by ID
router.get('/:id', TagController.getTagById);

// Update Tag
router.put('/:id', TagController.updateTag);

// Delete Tag
router.delete('/:id', TagController.deleteTag);

module.exports = router;
