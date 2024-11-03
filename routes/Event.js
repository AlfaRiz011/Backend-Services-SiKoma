const express = require('express');
const router = express.Router();
const eventController = require('../controllers/EventController');

//Get Event Participant
router.get('/:postId', eventController.getAllParticipant);

//Participate Event
router.post('/:postId', eventController.postParticipant);

//Delete Event Participant
router.delete('/:postId', eventController.deleteParticipant);

module.exports = router;