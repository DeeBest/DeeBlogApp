const Post = require('../models/postModel');

const createPost = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!user?.roles.includes(2001)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  const { postTitle, postBody, postCategory } = req.body;

  if (!postTitle || !postBody || !postCategory) {
    return res.status(400).json({ message: 'All post fields are required' });
  }

  const creatorID = user.id;
  const slug = postTitle
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '-');
  const newPost = {
    creatorID,
    postTitle,
    postCategory,
    postBody,
    slug,
  };

  try {
    await Post.create(newPost);
    res.status(201).json({ message: 'Post created successfully', newPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost };
