const router = require('express').Router();
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const rolesList = require('../config/rolesList');
const { createPost, getAllPosts } = require('../controllers/postController');

router.get('/', getAllPosts);
router.post(
  '/create-post',
  verifyJWT,
  verifyRoles(rolesList.admin),
  createPost
);

module.exports = router;
