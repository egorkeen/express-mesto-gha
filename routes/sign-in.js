const loginRouter = require('express').Router();
const { login } = require('../controllers/users');
const { celebrateSignIn } = require('../middlewares/celebrate');

loginRouter.post('/signin', celebrateSignIn, login);

module.exports = loginRouter;
