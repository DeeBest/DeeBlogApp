const { login, logout } = require('../controllers/userAuthController');

const router = require('express').Router();

router.route('/').post(login).get(logout);

module.exports = router;
