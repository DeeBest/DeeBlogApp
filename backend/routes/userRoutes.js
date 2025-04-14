const router = require('express').Router();

const rolesList = require('../config/rolesList');
const verifyRoles = require('../middleware/verifyRoles');
const verifyJWT = require('../middleware/verifyJWT');

const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.post('/sign-up', createUser);

router.use(verifyJWT);
router.get('/:id', getSingleUser);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);
router.get('/', verifyRoles(rolesList.admin, rolesList.demoAdmin), getAllUsers);

module.exports = router;
