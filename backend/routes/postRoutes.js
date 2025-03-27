const router = require('express').Router();
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const rolesList = require('../config/rolesList');
const {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
  getSinglePost,
} = require('../controllers/postController');

router.get('/', getAllPosts);
router.use(verifyJWT);
router.use(verifyRoles(rolesList.admin));
router.post('/create-post', createPost);
router.delete('/delete-post/:id', deletePost);
router.put('/update-post/:id', updatePost);
router.get('/:id', getSinglePost);

module.exports = router;
