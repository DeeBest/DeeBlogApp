const router = require('express').Router();
const verifyJWT = require('../middleware/verifyJWT');
const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/sign-up', createUser);
router.use(verifyJWT);
router.get('/:id', getSingleUser);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

module.exports = router;
