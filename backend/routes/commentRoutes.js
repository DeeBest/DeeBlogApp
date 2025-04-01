const express = require('express');
const { createComment } = require('../controllers/commentController');
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();

router.post('/create-comment', verifyJWT, createComment);

module.exports = router;
