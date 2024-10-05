const Notification = require('../models/Notification');
const { sendSuccessResponse, sendErrorResponse } = require('../helpers/ResponseHelper');

// Create Notification
exports.createNotification = async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    const savedNotification = await newNotification.save();
    return sendSuccessResponse(res, 201, 'Notification created successfully', savedNotification);
  } catch (error) {
    return Response(res, 400, 'Failed to create notification', error.message);
  }
};

// Get All Notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    return sendSuccessResponse(res, 200, 'Notifications retrieved successfully', notifications);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to retrieve notifications', error.message);
  }
};

// Get Notification by notificationId
exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findOne({ notificationId: req.params.notificationId });
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
    const updatedNotification = await Notification.findOneAndUpdate(
      { notificationId: req.params.notificationId },
      req.body,
      { new: true }
    );
    if (!updatedNotification) {
      return sendErrorResponse(res, 404, 'Notification not found');
    }
    return sendSuccessResponse(res, 200, 'Notification updated successfully', updatedNotification);
  } catch (error) {
    return sendErrorResponse(res, 400, 'Failed to update notification', error.message);
  }
};

// Delete Notification
exports.deleteNotification = async (req, res) => {
  try {
    const deletedNotification = await Notification.findOneAndDelete({ notificationId: req.params.notificationId });
    if (!deletedNotification) {
      return sendErrorResponse(res, 404, 'Notification not found');
    }
    return sendSuccessResponse(res, 200, 'Notification deleted successfully', deletedNotification);
  } catch (error) {
    return sendErrorResponse(res, 500, 'Failed to delete notification', error.message);
  }
};
