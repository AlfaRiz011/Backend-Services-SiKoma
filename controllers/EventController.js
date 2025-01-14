const Event = require('../models/EventParticipant');
const User = require('../models/User');
const Post = require('../models/Post');

const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Get Event Participants
exports.getAllParticipant = async (req, res) => {
    try {
        const participants = await Event.findAll({
            where: {
                post_id: req.params.postId
            },
            include: [{
                model: User,
                model: Post
            }],
        });
        return sendSuccessResponse(res, 200, 'Event participants retrieved successfully', participants);
    } catch (error) {
        return sendErrorResponse(res, 500, 'Failed to retrieve event participants', error.message);
    }
};

exports.getEventPostByUserId = async (req, res) => {
    try {
        const events = await Event.findAll({
            where: {
                user_id: req.params.userId
            },
            include: [
                {
                model: Post,  
                required: true
            }
        ]});

        const posts = events.Map(event => event.Post);

        return sendSuccessResponse(res, 200, 'Event participants retrieved successfully', posts);
    } catch (error) {
        return sendErrorResponse(res, 500, 'Failed to retrieve event participants', error.message);
    }
}

// Participate in Event
exports.postParticipant = async (req, res) => { 
    const postId = req.params.postId;
    const { user_id } = req.query;

    try {        
        const existingParticipant = await Event.findOne({
            where: { user_id, post_id: postId }
        });
        if (existingParticipant) {
            return sendErrorResponse(res, 400, 'User is already participating in the event');
        }
 
        const newParticipant = await Event.create({ user_id, post_id: postId });
        return sendSuccessResponse(res, 201, 'User successfully participated in event', newParticipant);
    } catch (error) {
        return sendErrorResponse(res, 500, 'Failed to add participant to event', error.message);
    }
};


// Delete Event Participant
exports.deleteParticipant = async (req, res) => {
    const postId = req.params.postId;
    const { user_id } = req.query;

    try {
        const participant = await Event.findOne({
            where: { user_id, post_id: postId }
        });

        if (!participant) {
            return sendErrorResponse(res, 404, 'Participant not found');
        }

        await participant.destroy();
        return sendSuccessResponse(res, 200, 'Participant removed from event successfully');
    } catch (error) {
        return sendErrorResponse(res, 500, 'Failed to remove participant from event', error.message);
    }
};
