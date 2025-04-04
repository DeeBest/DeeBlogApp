const Comment = require('../models/commentsModel');

const createComment = async (req, res) => {
  const { postId, commentContent, userId } = req.body;
  const postCreatorId = req.user.id;

  if (!postCreatorId || !userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (postCreatorId != userId) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (!commentContent || !postId) {
    return res
      .status(400)
      .json({ message: 'Comment content and post ID required.' });
  }

  try {
    const comment = await Comment.create({
      postCreatorId,
      postId,
      commentContent,
    });

    res.status(201).json({ message: 'Success', comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getComments = async (req, res) => {
  const postId = req.params.postId;

  if (!postId) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  try {
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    if (!comments || comments.length <= 0) {
      return res.status(404).json({ message: 'No comments for this post' });
    }

    res.status(200).json({ message: 'Success', comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createComment, getComments };
