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

// Get All Notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll(); 
    return sendSuccessResponse(res, 200, 'Notifications retrieved successfully', notifications);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve notifications', error.message);
  }
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

// Update Notification
exports.updateNotification = async (req, res) => {
  try {
    const [updated] = await Notification.update(req.body, { 
      where: { id: req.params.notificationId }, 
      returning: true, 
    });
    if (!updated) {
      return sendErrorResponse(res, 404, 'Notification not found');
    }
    const updatedNotification = await Notification.findOne({ where: { id: req.params.notificationId } });
    return sendSuccessResponse(res, 200, 'Notification updated successfully', updatedNotification);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to update notification', error.message);
  }
};

// Delete Notification
exports.deleteNotification = async (req, res) => {
  try {
    const deleted = await Notification.destroy({ where: { id: req.params.notificationId } }); 
    if (!deleted) {
      return sendErrorResponse(res, 404, 'Notification not found');
    }
    return sendSuccessResponse(res, 200, 'Notification deleted successfully');
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to delete notification', error.message);
  }
};
