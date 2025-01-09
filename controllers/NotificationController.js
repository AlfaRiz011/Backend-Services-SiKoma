const Notification = require('../models/Notification');
const User = require('../models/User');
const Post = require('../models/Post');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Notification
exports.createNotification = async (req, res) => {
  const { post_id } = req.query;  
  const userId = req.params.userId; 

  try {
      const newNotification = await Notification.create({
          user_id: userId,
          post_id,
          is_active: false  
      });
      return sendSuccessResponse(res, 201, 'Notification created successfully', newNotification);
  } catch (error) {
      return sendErrorResponse(res, 500, 'Failed to create notification', error.message);
  }
};


// Get Post Notifications
exports.getPostNotifications = async (req, res) => {
  const userId = req.params.userId;  

  try {
      const notifications = await Notification.findAll({
          where: { user_id: userId },
          include: [
              {
                  model: Post,
                  where: { type: 'information' }
              }
          ]
      });
      return sendSuccessResponse(res, 200, 'Post notifications retrieved successfully', notifications);
  } catch (error) {
      return sendErrorResponse(res, 500, 'Failed to retrieve post notifications', error.message);
  }
};


// Get Event Notifications
exports.getEventNotifications = async (req, res) => {
  const userId = req.params.userId;  

  try {
      const notifications = await Notification.findAll({
          where: { user_id: userId },
          include: [
              {
                  model: Post,
                  where: { type: 'event' }
              }
          ]
      });
      return sendSuccessResponse(res, 200, 'Event notifications retrieved successfully', notifications);
  } catch (error) {
      return sendErrorResponse(res, 500, 'Failed to retrieve event notifications', error.message);
  }
};


// Update Read All Notifications
exports.updateAllNotification = async (req, res) => {
  const userId = req.params.userId;  

  try {
      await Notification.update(
          { is_active: true },
          { where: { user_id: userId } }
      );
      return sendSuccessResponse(res, 200, 'All notifications marked as read');
  } catch (error) {
      return sendErrorResponse(res, 500, 'Failed to mark all notifications as read', error.message);
  }
};


// Update Read Notification
exports.updateOneNotification = async (req, res) => {
  const notifId = req.params.notifId;  

  try {
      const notification = await Notification.findByPk(notifId);
      if (!notification) {
          return sendErrorResponse(res, 404, 'Notification not found');
      }

      notification.is_active = true;
      await notification.save();
      return sendSuccessResponse(res, 200, 'Notification marked as read', notification);
  } catch (error) {
      return sendErrorResponse(res, 500, 'Failed to mark notification as read', error.message);
  }
};


// Get Notification by notificationId
exports.getNotificationById = async (req, res) => {
  const notifId = req.params.notifId; 

  try {
      const notification = await Notification.findByPk(notifId, {
          include: [
              { model: User },
              { model: Post }
          ]
      });

      if (!notification) {
          return sendErrorResponse(res, 404, 'Notification not found');
      }

      return sendSuccessResponse(res, 200, 'Notification retrieved successfully', notification);
  } catch (error) {
      return sendErrorResponse(res, 500, 'Failed to retrieve notification', error.message);
  }
};
