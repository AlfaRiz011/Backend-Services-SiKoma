const Post = require('../models/Post');
const User = require('../models/User');
const Admin = require('../models/Admin');
const PostRecommendation = require('../models/PostRecommendation');
const Like = require('../models/Like');
const path = require('path');
const fs = require('fs');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Post
exports.createPost = async (req, res) => {
  try {
    const { description, type, event_name, event_date, event_time } = req.body;
  
    const newPost = await Post.create({
      description,
      admin_id: req.params.adminId,
      type,
      event_name: type === 'event' ? event_name : null,
      event_date: type === 'event' ? event_date : null,
      event_time: type === 'event' ? event_time : null,
      image: req.file ? req.file.filename : null, 
    });

    return sendSuccessResponse(res, 201, 'Post created successfully', newPost);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to create post', error.message);
  }
};

// Get All Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: Admin
      },
    });
    return sendSuccessResponse(res, 200, 'Posts retrieved successfully', posts);
  } catch (error) { 
    return sendErrorResponse(res, 500, 'Failed to retrieve posts', error.message);
  }
};

// Get Post by postId
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { post_id: req.params.postId },
      include: {
        model: Admin
      },
    });
    if (!post) {
      return sendErrorResponse(res, 404, 'Post not found');
    }
    return sendSuccessResponse(res, 200, 'Post retrieved successfully', post);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve post', error.message);
  }
};


// Get Post by Admin
exports.getPostByAdminId = async (req, res) => {
  try { 
    const posts = await Post.findAll({ 
      where: { admin_id: req.params.adminId },
      include: {
        model: Admin,
      },
    });
    
    if (posts.length === 0) {
      return sendErrorResponse(res, 404, 'No posts found for this admin');
    }

    return sendSuccessResponse(res, 200, 'Posts retrieved successfully', posts);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve posts', error.message);
  }
};

// Get Posts Events
exports.getPostsEvents = async (req, res) => {
  try {
    const posts = await Post.findAll({ 
      where: { type: "event" },
      include: {
        model: Admin, 
      },
    });
    
    if (posts.length === 0) {
      return sendErrorResponse(res, 404, 'No posts found of type "event"');
    }

    return sendSuccessResponse(res, 200, 'Posts retrieved successfully', posts);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve posts', error.message);
  }
};


// Get Posts Events by Admin
exports.getPostsEventsAdmin = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: { type: 'event', admin_id: req.params.adminId },
      include: {
        model: Admin,
      },
    });
    
    if (posts.length === 0) {
      return sendErrorResponse(res, 404, 'No event posts found for this admin');
    }

    return sendSuccessResponse(res, 200, 'Event posts retrieved successfully', posts);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve event posts', error.message);
  }
};


// Get Recommendation Post
exports.getRecommendationPost = async (req, res) => {
  try { 
      const recommendations = await PostRecommendation.findAll({
          where: { user_id: req.params.id }
      });
 
      if (!recommendations.length) {
          return sendSuccessResponse(res, 200, 'No recommendations found', []);
      }
 
      const postIds = recommendations.map(rec => rec.post_id);
 
      const posts = await Post.findAll({
          where: { post_id: postIds },
          include: {
            model: Admin, 
          },
      });

      return sendSuccessResponse(res, 200, 'Posts Recommendation retrieved successfully', posts);

  } catch (error) {
      return sendErrorResponse(res, 500, 'Failed to retrieve recommendation posts', error.message);
  }
};

// Like Post
exports.likePost = async (req, res) => {
  const { post_id } = req.body;

  try {
    const post = await Post.findOne({ where: { post_id } });
    if (!post) {
      return sendErrorResponse(res, 404, 'Post not found');
    }

    const newLikePost = await Like.create({
      user_id: req.params.userId,
      post_id,
    });

    return sendSuccessResponse(res, 200, 'Post liked successfully', newLikePost);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to like post', error.message);
  }
};  
 
exports.updatePost = async (req, res) => { 

  try { 
    const postToUpdate = await Post.findOne({ where: { post_id: req.params.postId } });
    if (!postToUpdate) {
      return sendErrorResponse(res, 404, 'Post not found');
    }
 
    if (req.file) {
      const oldImagePath = path.join(__dirname, '../uploads/posts/', postToUpdate.image);
       
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
 
      postToUpdate.image = req.file.filename;  
    }
 
    const updatedData = {
      description: req.body.description || postToUpdate.description,
      type: req.body.type || postToUpdate.type,
      event_name: req.body.event_name || postToUpdate.event_name,
      event_date: req.body.event_date || postToUpdate.event_date,
      event_time: req.body.event_time || postToUpdate.event_time,
      image: postToUpdate.image  
    };

    await postToUpdate.update(updatedData);  

    return sendSuccessResponse(res, 200, 'Post updated successfully', postToUpdate);
  } catch (error) {
    console.error('Failed to update post:', error);  
    return sendErrorResponse(res, 500, 'Failed to update post', error.message);
  }
};


// Delete Post
exports.deletePost = async (req, res) => {
  const { postId } = req.params;

  try { 
    const post = await Post.findOne({ where: { post_id: postId } });
    if (!post) {
      return sendErrorResponse(res, 404, 'Post not found');
    }

    if (post.image) {
      const imagePath = path.join(__dirname, '../uploads/posts/', post.image);
      
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      } else {
        console.warn(`Image file not found at path: ${imagePath}`);
      }
    } else {
      console.warn('No image associated with this post, skipping deletion of the image');
    }

    await post.destroy();

    return sendSuccessResponse(res, 200, 'Post deleted successfully', post);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to delete post', error.message);
  }
};


