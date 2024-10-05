const mongoose = require('mongoose');

const TagsSchema = require('./Tags').schema;
const AdminSchema = require('./Admin').schema;



const PostSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: AdminSchema,
    required: true
  },
  image: {
    type: String, 
    default: ''
  },
  likes: {
    type: Number,
    default: 0
  },
  postDesc: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  tags: [{
    type: TagsSchema, 
    required: false
  }],
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Post', PostSchema);
