const signInRouter = require('express').Router();

const { login } = require('../controllers/users');

const celebrate = require('../middlewares/celebrate');

signInRouter.post('/signin', celebrate.celebrateLogin, login);

module.exports = signInRouter;
