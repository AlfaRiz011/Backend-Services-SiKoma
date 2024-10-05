const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  nim: {
    type: String,
    required: true,
    unique: true
  },
  faculties: {
    type: String,
    required: true
  },
  studyProgram: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);