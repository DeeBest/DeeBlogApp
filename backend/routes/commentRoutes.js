const express = require('express');
const {
  createComment,
  getComments,
} = require('../controllers/commentController');
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();

router.post('/create-comment', verifyJWT, createComment);
router.get('/get-comments/:postId', getComments);

module.exports = router;
