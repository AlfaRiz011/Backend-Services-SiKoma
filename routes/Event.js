const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

//Get Event Participant
router.get('/', eventController.getAllParticipant);

//Participate Event
router.get('/:postId', eventController.postParticipant);

//Delete Event Participant
router.delete('/:postId', eventController.deleteParticipant);

module.exports = router;