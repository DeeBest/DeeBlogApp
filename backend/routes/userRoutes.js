const router = require('express').Router();
const {
  getAllUsers,
  createUser,
  getSingleUser,
} = require('../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getSingleUser);

module.exports = router;
