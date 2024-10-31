const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Create Notification
router.post('/:userId', notificationController.createNotification);

// Get Post Notifications
router.get('/', notificationController.getPostNotifications);

// Get Event Notifications
router.get('/', notificationController.getEventNotifications);

// Get Notifications by ID
router.get('/:notifID', notificationController.getNotificationById); 

// Update Read All Notification
router.patch('/:userId', notificationController.updateAllNotification);

// Update Read Notification
router.patch('/', notificationController.updateOneNotification);

module.exports = router;
