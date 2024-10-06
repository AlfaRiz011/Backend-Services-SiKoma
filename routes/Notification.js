const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Create Notification
router.post('/', notificationController.createNotification);

// Get All Notifications
router.get('/', notificationController.getAllNotifications);

// Get Notification by ID
router.get('/:notificationId', notificationController.getNotificationById);

// Update Notification
router.put('/:notificationId', notificationController.updateNotification);

// Delete Notification
router.delete('/:notificationId', notificationController.deleteNotification);

module.exports = router;
