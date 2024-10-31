const Notification = require('../models/Notification');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Notification
exports.createNotification = async (req, res) => {
  try {
    const newNotification = await Notification.create(req.body); 
    return sendSuccessResponse(res, 201, 'Notification created successfully', newNotification);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to create notification', error.message);
  }
};

// Get Post Notifications
exports.getPostNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll(); 
    return sendSuccessResponse(res, 200, 'Notifications retrieved successfully', notifications);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve notifications', error.message);
  }
};

//Get Event Notifications
exports.getEventNotifications = async (req, res) => {
};

//Update Read All Notifications
exports.updateAllNotification = async (req, res) => {
};

//Update Read Notifications
exports.updateOneNotification = async (req, res) => {
};

// Get Notification by notificationId
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findOne({ where: { id: req.params.notificationId } }); 
    if (!notification) {
      return sendErrorResponse(res, 404, 'Notification not found');
    }
    return sendSuccessResponse(res, 200, 'Notification retrieved successfully', notification);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve notification', error.message);
  }
};