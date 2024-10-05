const mongoose = require('mongoose');

const PostSchema = require('./Post').schema;
const UserSchema = require('./User').schema;

const NotificationSchema = new mongoose.Schema({
  notificationId: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: PostSchema, 
    required: true
  },
  recipient: {
    type: UserSchema, 
    required: true
  },
  type: {
    type: String, 
    required: true
  },
  pushTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', NotificationSchema);
