const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.sort === 'asc' ? 1 : -1;

  if (!req?.user?.roles.includes(2001)) {
    return res
      .status(401)
      .json({ message: 'You are forbidden to make this request' });
  }

  try {
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    if (!users) {
      return res.status(204).json({ message: 'No users found.' });
    }

    const usersWithoutPasswords = users.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      message: 'Success',
      users: usersWithoutPasswords,
      totalUsers,
      lastMonthUsers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const duplicateUser = await User.findOne({ email }).exec();

    if (duplicateUser) {
      return res
        .status(409)
        .json({ message: `A user with ${email} email already exists.` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: `Successfully created ${username} user.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'Please provide ID.' });
  }

  try {
    const user = await User.findOne({ _id: id }).exec();

    if (!user) {
      return res.status(404).json({ message: `No user with ${id} ID.` });
    }

    const { password, refreshToken, ...rest } = user._doc;

    res.status(200).json({ message: 'Success', user: rest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'ID required.' });
  }

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: `No user matches ID ${id}` });
    }

    if (req?.body?.username) {
      user.username = req.body.username;
    }

    if (req?.body?.email) {
      user.email = req.body.email;
    }

    if (req?.body?.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: `Successfully updated ${user.username}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'ID required' });
  }

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: `No user found with ID ${id} ` });
    }

    await user.deleteOne();

    res.status(204).json({ message: `Successfully deleted ${user.username}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
