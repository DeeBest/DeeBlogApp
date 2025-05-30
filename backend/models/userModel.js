const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: [true, 'Please provide username'],
    },
    email: {
      type: String,
      require: [true, 'Please provide email'],
      unique: [true, 'Email already registered'],
    },
    password: {
      type: String,
      require: [true, 'Please provide password'],
    },
    refreshToken: {
      type: String,
    },
    roles: {
      user: {
        type: Number,
        default: 2022,
      },
      admin: Number,
      demoAdmin: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
