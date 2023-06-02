const usersRouter = require('express').Router();
const {
  getUsers,
  getUserInfo,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

usersRouter.get('/users', auth, getUsers);
usersRouter.get('/users/me', auth, getUserInfo);
usersRouter.get('/users/:userId', auth, getUserById);
usersRouter.patch('/users/me', auth, updateProfile);
usersRouter.patch('/users/me/avatar', auth, updateAvatar);

module.exports = usersRouter;
