const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    postCreatorID: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    postTitle: {
      type: String,
      required: [true, 'Please add post post Title'],
    },
    postCategory: {
      type: String,
      required: [true, 'Please add post Category'],
    },
    postBody: {
      type: String,
      required: [true, 'Please add post Body'],
    },
    slug: {
      type: String,
      required: [true, 'Please add post Slug'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
