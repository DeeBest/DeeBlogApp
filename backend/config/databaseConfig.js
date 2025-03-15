const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_URI);
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
};

module.exports = connectDB;
