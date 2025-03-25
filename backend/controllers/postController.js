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

  const postCreatorID = user.id;
  const slug = postTitle
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '-');
  const newPost = {
    postCreatorID,
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

const getAllPosts = async (req, res) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.order === 'asc' ? 1 : -1;

  try {
    const posts = await Post.find({
      ...(req.query.postCreatorID && {
        postCreatorID: req.query.postCreatorID,
      }),
      ...(req.query.postCategory && {
        postCategory: req.query.postCategory,
      }),
      ...(req.query.slug && {
        slug: req.query.slug,
      }),
      ...(req.query.searchTerm && {
        $or: [
          { postTitle: { $regex: req.query.searchTerm, $options: 'i' } },
          { postBody: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthsPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    if (posts.length < 0 || !posts)
      return res.status(404).json({ message: 'There are no posts' });

    res
      .status(200)
      .json({ message: 'Success', posts, totalPosts, lastMonthsPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getAllPosts };
