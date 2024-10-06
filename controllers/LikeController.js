const Like = require('../models/Like');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Like
exports.createLike = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const newLike = await Like.create({ userId, postId });
    return sendSuccessResponse(res, 201, 'Like created successfully', newLike);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to create like', error.message);
  }
};

// Get All Likes
exports.getAllLikes = async (req, res) => {
  try {
    const likes = await Like.findAll(); 
    return sendSuccessResponse(res, 200, 'Likes retrieved successfully', likes);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve likes', error.message);
  }
};

// Get Likes by PostId
exports.getLikesByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const likes = await Like.findAll({ where: { postId } }); 
    return sendSuccessResponse(res, 200, 'Likes retrieved successfully', likes);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve likes', error.message);
  }
};

// Delete Like
exports.deleteLike = async (req, res) => {
  const { userId, postId } = req.params;
  try {
    const deletedLike = await Like.destroy({ where: { userId, postId } });
    return sendSuccessResponse(res, 200, 'Like deleted successfully');
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to delete like', error.message);
  }
};
