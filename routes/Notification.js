const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/NotificationController');

// Create Notification
router.post('/:userId', notificationController.createNotification);

// Get Post Notifications
router.get('/info/:userId', notificationController.getPostNotifications);

// Get Event Notifications
router.get('/event/:userId', notificationController.getEventNotifications);

// Get Notifications by ID
router.get('/:notifId', notificationController.getNotificationById); 

// Update Read All Notification
router.patch('/all/:userId', notificationController.updateAllNotification);

// Update Read Notification
router.patch('/one/:notifId', notificationController.updateOneNotification);

module.exports = router;
