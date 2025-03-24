const router = require('express').Router();
const verifyJWT = require('../middleware/verifyJWT');
const verifyRoles = require('../middleware/verifyRoles');
const rolesList = require('../config/rolesList');
const { createPost } = require('../controllers/postController');

router.post(
  '/create-post',
  verifyJWT,
  verifyRoles(rolesList.admin),
  createPost
);

module.exports = router;
