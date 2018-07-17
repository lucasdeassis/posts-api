var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500,
    trim: true,
  },
  userFirstName: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = { Post };
