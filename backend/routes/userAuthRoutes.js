const { login, logout } = require('../controllers/userAuthController');

const router = require('express').Router();

router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
