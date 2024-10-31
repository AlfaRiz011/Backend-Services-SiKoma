const Tags = require('../models/Tags'); 
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Tags
exports.createTag = async (req, res) => {
  const { postId, tagName } = req.body;
  try {
    const newTag = await Tags.create({ postId, tagName }); 
    return sendSuccessResponse(res, 201, 'Tag created successfully', newTag);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to create tag', error.message);
  }
};

exports.getTagsByPostId = async (req, res) => {
  try {
    const tags = await Tags.findAll({ where: { postId: req.params.postId } }); 
    return sendSuccessResponse(res, 200, 'Tags retrieved successfully', tags);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve tags', error.message);
  }
};

exports.getAllTag = async (req, res) => {
  
}

exports.postTagPost= async (req, res) => {
  
}