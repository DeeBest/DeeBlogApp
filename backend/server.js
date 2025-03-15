require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const connectDB = require('./config/databaseConfig');

connectDB();

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'welcome to DeeBlogApp backend' });
});

app.all('*', (req, res) => {
  return res.status(400).json({ message: 'route not found' });
});

mongoose.connection.once('open', () => {
  console.log('Connected to the database');

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});
