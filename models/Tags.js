const mongoose = require('mongoose');

const TagsSchema = new mongoose.Schema({
  tagsId: {
    type: String,
    required: true,
    unique: true
  },
  tagsName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Tags', TagsSchema);