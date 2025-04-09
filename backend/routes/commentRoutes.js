const express = require('express');
const router = express.Router();
const {
  createComment,
  getComments,
  likeComment,
  editComment,
  deleteComment,
  getAllComments,
} = require('../controllers/commentController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);
router.get('/get-comments/:postId', getComments);
router.post('/create-comment', createComment);
router.put('/like-comment/:commentId', likeComment);
router.put('/edit-comment/:commentId', editComment);
router.delete('/delete-comment/:commentId', deleteComment);
router.get('/get-all-comments', getAllComments);

module.exports = router;
