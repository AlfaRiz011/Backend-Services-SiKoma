const Like = require('../models/Like');
const { sendsendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Like
exports.createLike = async (req, res) => {
  try {
    const newLike = new Like(req.body);
    const savedLike = await newLike.save();
    return sendSuccessResponse(res, 201, 'Like created successfully', savedLike);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to create like', error.message);
  }
};

// Get All Likes
exports.getAllLikes = async (req, res) => {
  try {
    const likes = await Like.find();
    return sendSuccessResponse(res, 200, 'Likes retrieved successfully', likes);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve likes', error.message);
  }
};

// Get Like by likeId
exports.getLikeById = async (req, res) => {
  try {
    const like = await Like.findOne({ likeId: req.params.likeId });
    if (!like) {
      return sendErrorResponse(res, 404, 'Like not found');
    }
    return sendSuccessResponse(res, 200, 'Like retrieved successfully', like);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve like', error.message);
  }
};

// Update Like
exports.updateLike = async (req, res) => {
  try {
    const updatedLike = await Like.findOneAndUpdate(
      { likeId: req.params.likeId },
      req.body,
      { new: true }
    );
    if (!updatedLike) {
      return sendErrorResponse(res, 404, 'Like not found');
    }
    return sendSuccessResponse(res, 200, 'Like updated successfully', updatedLike);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to update like', error.message);
  }
};

// Delete Like
exports.deleteLike = async (req, res) => {
  try {
    const deletedLike = await Like.findOneAndDelete({ likeId: req.params.likeId });
    if (!deletedLike) {
      return sendErrorResponse(res, 404, 'Like not found');
    }
    return sendSuccessResponse(res, 200, 'Like deleted successfully', deletedLike);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to delete like', error.message);
  }
};
