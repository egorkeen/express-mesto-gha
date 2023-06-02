const userRouter = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

const {
  celebrateGetUserById,
  celebrateUpdateUserProfile,
  celebrateUpdateUserAvatar,
} = require('../middlewares/celebrate');

const { auth } = require('../middlewares/auth');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getCurrentUser);
userRouter.get('/users/:userId', celebrateGetUserById, getUserById);
userRouter.patch('/users/me', celebrateUpdateUserProfile, updateUserProfile);
userRouter.patch('/users/me/avatar', celebrateUpdateUserAvatar, updateUserAvatar);
userRouter.use(auth);

module.exports = userRouter;
