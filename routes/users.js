const userRouter = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

const celebrate = require('../middlewares/celebrate');

userRouter.get('/users', getUsers);
userRouter.get('/users/me', getCurrentUser);
userRouter.get('/users/:userId', celebrate.celebrateGetUserById, getUserById);
userRouter.patch('/users/me', celebrate.celebrateUpdateUserProfile, updateUserProfile);
userRouter.patch('/users/me/avatar', celebrate.celebrateUpdateUserAvatar, updateUserAvatar);

module.exports = userRouter;
