const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUserByUserId,
  updateUser,
  deleteUser,
  getUserByEmail
} = require('./user.controller');
const { checkToken } = require('../../auth/token_validation');

router.route('/').post(createUser).get(checkToken, getUsers);

router
  .route('/:id')
  .get(checkToken, getUserByUserId)
  .patch(checkToken, updateUser)
  .delete(checkToken, deleteUser);

router.post('/login', getUserByEmail);

module.exports = router;
