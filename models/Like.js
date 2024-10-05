const mongoose = require('mongoose');

// Import UserSchema dan PostSchema untuk reference di dalam Like
const UserSchema = require('./User').schema;
const PostSchema = require('./Post').schema;

// Definisi Schema untuk Like
const LikeSchema = new mongoose.Schema({
  likeId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: UserSchema,  
    required: true
  },
  post: {
    type: PostSchema,  
    required: true
  }
});

module.exports = mongoose.model('Like', LikeSchema);
