const express = require('express');
const {
  createComment,
  getComments,
  likeComment,
  editComment,
} = require('../controllers/commentController');
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();

router.post('/create-comment', verifyJWT, createComment);
router.get('/get-comments/:postId', getComments);
router.put('/like-comment/:commentId', verifyJWT, likeComment);
router.put('/edit-comment/:commentId', verifyJWT, editComment);

module.exports = router;
