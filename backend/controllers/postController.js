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
  const sortDirection = req.query.sort === 'asc' ? 1 : -1;

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

const deletePost = async (req, res) => {
  const { id } = req.params;
  const postCreatorID = req.user.id;

  if (!id) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  try {
    const foundPost = await Post.findOne({ _id: id }).exec();

    if (!foundPost) {
      return res.status(404).json({ message: `No post with ${id} was found.` });
    }

    if (postCreatorID != foundPost.postCreatorID) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await Post.deleteOne(foundPost);

    return res.status(204).json({
      message: `You have successfully deleted ${foundPost.postTitle}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const postCreatorID = req.user.id;

  if (!id) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  if (!postCreatorID) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const foundPost = await Post.findOne({ _id: id }).exec();

    if (!foundPost) {
      return res
        .status(404)
        .json({ message: `No post with the ${id} ID was found.` });
    }

    if (postCreatorID != foundPost.postCreatorID) {
      return res.status(403).json({
        message: `Forbidden`,
      });
    }

    if (req.body?.postTitle) {
      foundPost.postTitle = req.body.postTitle;
      const slug = foundPost.postTitle
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '-');

      foundPost.slug = slug;
    }

    if (req.body?.postBody) {
      foundPost.postBody = req.body.postBody;
    }

    if (req.body?.postCategory) {
      foundPost.postCategory = req.body.postCategory;
    }

    await foundPost.save();
    res.status(200).json({ message: 'Post successfully updated', foundPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getSinglePost = async (req, res) => {
  const id = req.params.id;
  const postCreatorID = req.user.id;

  if (!id) {
    return res.status(400).json({ message: 'Post ID is required' });
  }

  if (!postCreatorID) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const foundPost = await Post.findOne({ _id: id }).exec();

    if (!foundPost) {
      return res
        .status(404)
        .json({ message: `No post with ${id} ID was found` });
    }

    if (postCreatorID != foundPost.postCreatorID) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.status(200).json({ message: 'Success', foundPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
  getSinglePost,
};
