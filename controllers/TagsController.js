const Tags = require('../models/Tags'); 
const Post = require('../models/Post'); 
const PostTag = require('../models/PostTag');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Tags
exports.createTag = async (req, res) => {
  const { tag_name } = req.body;
  try {
    const newTag = await Tags.create({ tag_name: tag_name }); 
    return sendSuccessResponse(res, 201, 'Tag created successfully', newTag);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to create tag', error.message);
  }
};

// Get Tags by Post ID
exports.getTagsByPostId = async (req, res) => { 
  try {
    const postTags = await PostTag.findAll({ 
      where: { post_id: req.params.postId }  
    });
     
    const tagIds = postTags.map(postTag => postTag.tag_id);
 
    const tagsList = await Tags.findAll({ where: { tag_id: tagIds } });

    return sendSuccessResponse(res, 200, 'Tags retrieved successfully', tagsList);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve tags', error.message);
  }
};

// Get All Tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tags.findAll();
    return sendSuccessResponse(res, 200, 'All tags retrieved successfully', tags);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve tags', error.message);
  }
};

// Add Tag to Post
exports.postTagPost = async (req, res) => { 
  const { tag_name } = req.query;

  try {
    
    let tag = await Tags.findOne({ where: { tag_name } });
 
    if (!tag) {
      tag = await Tags.create({ tag_name });
    }

    const tag_id = tag.tag_id;
 
    const newPostTags = await PostTag.create({ post_id: req.params.postId, tag_id });
 
     const tagFollowers = await FollowTag.findAll({
      where: { tag_id },
      attributes: ['user_id'],
    });
    const tagFollowerIds = tagFollowers.map(follower => follower.user_id);
 
    const notifications = tagFollowerIds.map(userId => ({
      user_id: userId,
      post_id: req.params.postId,
      is_active: true,  
    }));
 
    await Notification.bulkCreate(notifications);

    return sendSuccessResponse(res, 201, 'Tag added to post successfully', newPostTags);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to add tag to post', error.message);
  }
};
