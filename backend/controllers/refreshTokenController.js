const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: 'Forbidden' });

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) return res.status(403).json({ message: 'Unauthorized' });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decodedInfo) => {
        if (err || foundUser.username !== decodedInfo.username)
          return res.status(403).json({ message: 'Unauthorized' });

        const accessToken = jwt.sign(
          {
            username: decodedInfo.username,
            id: decodedInfo.id,
            email: decodedInfo.email,
            roles: decodedInfo.roles,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '15m' }
        );

        res.status(200).json({ message: 'Success', accessToken });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = handleRefreshToken;
