const Post = require('../models/Post');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Post
exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    return sendSuccessResponse(res, 201, 'Post created successfully', savedPost);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to create post', error.message);
  }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return sendSuccessResponse(res, 200, 'Posts retrieved successfully', posts);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve posts', error.message);
  }
};

// Get Post by postId
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ postId: req.params.postId });
    if (!post) {
      return sendErrorResponse(res, 404, 'Post not found');
    }
    return sendSuccessResponse(res, 200, 'Post retrieved successfully', post);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve post', error.message);
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findOneAndUpdate(
      { postId: req.params.postId },
      req.body,
      { new: true }
    );
    if (!updatedPost) {
      return sendErrorResponse(res, 404, 'Post not found');
    }
    return sendSuccessResponse(res, 200, 'Post updated successfully', updatedPost);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to update post', error.message);
  }
};

// Delete Post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({ postId: req.params.postId });
    if (!deletedPost) {
      return sendErrorResponse(res, 404, 'Post not found');
    }
    return sendSuccessResponse(res, 200, 'Post deleted successfully', deletedPost);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to delete post', error.message);
  }
};
