const router = require('express').Router();
const { login } = require('../controllers/userAuthController');
const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/auth').post(login);

module.exports = router;
