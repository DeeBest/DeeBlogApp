const router = require('express').Router();
const { createPost } = require('../controllers/postController');
const verifyJWT = require('../middleware/verifyJWT');

router.post('/create-post', verifyJWT, createPost);

module.exports = router;
