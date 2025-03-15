const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(204).json({ message: 'No users found.' });
    }

    res.status(200).json({ message: 'Success', users });
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

    res.status(200).json({ message: 'Success', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllUsers, createUser, getSingleUser };
