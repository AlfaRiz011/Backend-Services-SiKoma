const FollowAdmin = require('../models/FollowAdmin');
const Admin = require('../models/Admin');
const Tags = require('../models/Tags');
const FollowTag = require('../models/FollowTag');

const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Get Followed Admin
exports.getFollowAdmin = async (req, res) => {
    const userId = req.params.userId; 
    try {
        const listAdmin = await FollowAdmin.findAll({
            where: { user_id: userId },  
            include: [{ model: Admin }]
        });
        return sendSuccessResponse(res, 200, 'Followed admins retrieved successfully', listAdmin);
    } catch (error) {
        return sendErrorResponse(res, 500, 'Failed to retrieve followed admins', error.message);
    }
};

// Get Followed Tag
exports.getFollowTag = async (req, res) => {
    const userId = req.params.userId;  
    try {
        const listTags = await FollowTag.findAll({
            where: { user_id: userId },  
            include: [{ model: Tags }]
        });
        return sendSuccessResponse(res, 200, 'Followed tags retrieved successfully', listTags);
    } catch (error) {
        return sendErrorResponse(res, 500, 'Failed to retrieve followed tags', error.message);
    }
};

// Follow Admin
exports.followAdmin = async (req, res) => {
    const userId = req.params.userId;
    const { admin_id } = req.query;
    try {
        const newFollow = await FollowAdmin.create({ user_id: userId, admin_id });
        return sendSuccessResponse(res, 201, 'Successfully followed admin', newFollow);
    } catch (error) {
        return sendErrorResponse(res, 500, 'Failed to follow admin', error.message);
    }
};

//Follow Tag
exports.followTag = async (req, res) => {    
    const { userId }= req.params.userId;
    const { tag_id } = req.query;
    try {
        const newFollow = await FollowTag.create({ user_id: userId, tag_id });
        return sendSuccessResponse(res, 201, 'Successfully followed admin', newFollow);
    } catch (error) {
        return sendErrorResponse(res, 500, 'Failed to follow admin', error.message);
    }
};

//unfollow Admin
exports.unfollowAdmin = async(req,res) => {
    const userId  = req.params.userId;
    const { admin_id } = req.query;

    try {
        
        const follower = await FollowAdmin.findOne({
            where:{
                user_id: userId,
                admin_id: admin_id
            }
        })

        if(!follower){
            return sendErrorResponse(res, 404, 'User not found', error.message);
        }

        await follower.destroy()

        return sendSuccessResponse(res, 200, 'Admin unfollow successfully');
    } catch (error) {
        return sendErrorResponse(res, 500, 'Failed to unfollow', error.message);
    }
};

//unfollow Tag
exports.unfollowTag = async (req,res) => {    
    const userId = req.params.userId;
    const { tag_id } = req.query;

    try {
        
        const follower = await FollowTag.findOne({
            where:{
                user_id: userId,
                tag_id: tag_id
            }
        })

        if(!follower){
            return sendErrorResponse(res, 404, 'User not found', error.message);
        }

        await follower.destroy()

        return sendSuccessResponse(res, 200, 'Tag unfollow successfully');
    } catch (error) {
        return sendErrorResponse(res, 500, 'Failed to unfollow', error.message);
    }
};
