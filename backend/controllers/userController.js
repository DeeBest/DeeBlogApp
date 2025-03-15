const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(204).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getAllUsers };
