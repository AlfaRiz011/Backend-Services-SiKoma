const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventController');

//Get Event Participant
router.get('/participant/:postId', eventController.getAllParticipant);

//Get Event Participant by UserId
router.get('/post/:userId', eventController.getEventPostByUserId);

//Participate Event
router.post('/:postId', eventController.postParticipant);

//Delete Event Participant
router.delete('/:postId', eventController.deleteParticipant);

module.exports = router;