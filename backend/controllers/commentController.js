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

const likeComment = async (req, res) => {
  const commentId = req.params.commentId;
  const userId = req.user.id;

  if (!commentId || !userId) {
    return res.status(400).json({ message: 'Comment ID and User ID required' });
  }

  try {
    const foundComment = await Comment.findById(commentId).exec();

    if (!foundComment) {
      return res
        .status(404)
        .json({ message: `No comment with ${commentId} ID` });
    }

    const userIdIndex = foundComment.likes.indexOf(userId);

    if (userIdIndex === -1) {
      foundComment.likes.push(userId);
      foundComment.numberOfLikes += 1;
    } else {
      foundComment.likes.splice(userIdIndex, 1);
      foundComment.numberOfLikes -= 1;
    }

    await foundComment.save();
    res
      .status(200)
      .json({ message: 'Successfully liked the comment', foundComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const editComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id;
  const { editedComment } = req.body;

  if (!commentId || !userId) {
    return res.status(400).json({ message: 'Comment ID and User ID required' });
  }

  if (!editedComment) {
    return res.status(200).json({ message: 'No comment changes provided' });
  }

  try {
    const foundComment = await Comment.findById(commentId).exec();

    if (
      foundComment.postCreatorId != userId &&
      !req.user.roles.includes(2001)
    ) {
      return res
        .status(403)
        .json({ message: 'You are forbidden to edit this comment' });
    }

    foundComment.commentContent = editedComment;

    await foundComment.save();

    res
      .status(200)
      .json({ message: 'Comment successfully updated', foundComment });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.id;

  if (!commentId || !userId) {
    return res.status(400).json({ message: 'Provide required details' });
  }

  try {
    const foundComment = await Comment.findById(commentId).exec();

    if (!foundComment) {
      return res
        .status(404)
        .json({ message: `No comment with ${commentId} ID` });
    }

    if (
      foundComment.postCreatorId != userId ||
      !req.user.roles.includes(2001)
    ) {
      return res
        .status(403)
        .json({ message: 'You are not allowed to delete this comment' });
    }

    await Comment.deleteOne(foundComment);
    res.status(200).json({ message: 'You successfully deleted the comment' });
  } catch (error) {
    console.error(500);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createComment,
  getComments,
  likeComment,
  editComment,
  deleteComment,
};
