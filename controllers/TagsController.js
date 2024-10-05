const Tags = require('../models/Tags');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Tag
exports.createTag = async (req, res) => {
  try {
    const newTag = new Tags(req.body);
    const savedTag = await newTag.save();
    return sendSuccessResponse(res, 201, 'Tag created successfully', savedTag);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to create tag', error.message);
  }
};

// Get All Tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tags.find();
    return sendSuccessResponse(res, 200, 'Tags retrieved successfully', tags);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve tags', error.message);
  }
};

// Get Tag by tagsId
exports.getTagById = async (req, res) => {
  try {
    const tag = await Tags.findOne({ tagsId: req.params.tagsId });
    if (!tag) {
      return sendErrorResponse(res, 404, 'Tag not found');
    }
    return sendSuccessResponse(res, 200, 'Tag retrieved successfully', tag);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve tag', error.message);
  }
};

// Update Tag
exports.updateTag = async (req, res) => {
  try {
    const updatedTag = await Tags.findOneAndUpdate(
      { tagsId: req.params.tagsId },
      req.body,
      { new: true }
    );
    if (!updatedTag) {
      return sendErrorResponse(res, 404, 'Tag not found');
    }
    return sendSuccessResponse(res, 200, 'Tag updated successfully', updatedTag);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to update tag', error.message);
  }
};

// Delete Tag
exports.deleteTag = async (req, res) => {
  try {
    const deletedTag = await Tags.findOneAndDelete({ tagsId: req.params.tagsId });
    if (!deletedTag) {
      return sendErrorResponse(res, 404, 'Tag not found');
    }
    return sendSuccessResponse(res, 200, 'Tag deleted successfully', deletedTag);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to delete tag', error.message);
  }
};
