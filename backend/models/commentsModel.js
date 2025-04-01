const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    commentContent: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    postCreatorId: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timesStamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
