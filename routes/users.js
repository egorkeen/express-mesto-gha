const usersRouter = require('express').Router();
const {
  getUsers,
  getUserInfo,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  celebrateGetUserById,
  celebrateUpdateProfile,
  celebrateUpdateAvatar,
} = require('../middlewares/celebrate');

usersRouter.get('/users', auth, getUsers);
usersRouter.get('/users/me', auth, getUserInfo);
usersRouter.get('/users/:userId', celebrateGetUserById, getUserById);
usersRouter.patch('/users/me', celebrateUpdateProfile, updateProfile);
usersRouter.patch('/users/me/avatar', celebrateUpdateAvatar, updateAvatar);

module.exports = usersRouter;
