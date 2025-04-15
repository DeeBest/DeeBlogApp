const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_URI);

    // mongoose.connect(process.env.DEV_DB);
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
};

module.exports = connectDB;
