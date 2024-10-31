const Post = require('../models/Post');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Post
exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body); 
    return sendSuccessResponse(res, 201, 'Post created successfully', newPost);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to create post', error.message);
  }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll(); 
    return sendSuccessResponse(res, 200, 'Posts retrieved successfully', posts);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve posts', error.message);
  }
};

// Get Post by postId
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({ where: { postId: req.params.postId } }); 
    if (!post) {
      return sendErrorResponse(res, 404, 'Post not found');
    }
    return sendSuccessResponse(res, 200, 'Post retrieved successfully', post);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve post', error.message);
  }
};

//Get Post by Admin
exports.getPostByAdminId = async (req, res) => {
  
}

// Get Posts by Event
exports.getPostsEvents = async (req, res) => {
  const post = await Post.findAll({where: {type: 'Events'}}); 
  try {
    const posts = await Post.findAll({ where: { type: post } }); 
    return sendSuccessResponse(res, 200, `Posts retrieved successfully`, posts);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve posts', error.message);
  }
};

//Get Posts Event Admin
exports.getPostsEventsAdmin = async (req, res) => {
  
}

//Get Recommendation Post
exports.getRecommendationPost = async (req, res) => {
  
}

//Like Post
exports.likePost = async (req, res) => {
  
}

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findOne({ where: { postId: req.params.postId } });
    if (!updatedPost) {
      return sendErrorResponse(res, 404, 'Post not found');
    }
    await updatedPost.update(req.body); 
    return sendSuccessResponse(res, 200, 'Post updated successfully', updatedPost);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to update post', error.message);
  }
};


//Delete Post
exports.deletePost = async (req, res) => {
  
}

