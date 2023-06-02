const SignInRouter = require('express').Router();

const { login } = require('../controllers/users');

const { celebrateLogin } = require('../middlewares/celebrate');

SignInRouter.post('/signin', celebrateLogin, login);

module.exports = SignInRouter;
