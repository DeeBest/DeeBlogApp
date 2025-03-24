require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');
const connectDB = require('./config/databaseConfig');
connectDB();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'welcome to DeeBlogApp backend' });
});

app.use('/api/users/auth', require('./routes/userAuthRoutes'));
app.use('/api/users/auth/refresh', require('./routes/refreshTokenRoute'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

app.all('*', (req, res) => {
  return res.status(404).json({ message: 'route not found' });
});

mongoose.connection.once('open', () => {
  console.log('Connected to the database');

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
});
