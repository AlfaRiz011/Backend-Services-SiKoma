const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');

// Create Notification
router.post('/', NotificationController.createNotification);

// Get All Notifications
router.get('/', NotificationController.getAllNotifications);

// Get Notification by ID
router.get('/:id', NotificationController.getNotificationById);

// Update Notification
router.put('/:id', NotificationController.updateNotification);

// Delete Notification
router.delete('/:id', NotificationController.deleteNotification);

module.exports = router;
