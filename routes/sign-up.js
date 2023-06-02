const registerRouter = require('express').Router();
const { postUser } = require('../controllers/users');
const { celebrateSignUp } = require('../middlewares/celebrate');

registerRouter.post('/signup', celebrateSignUp, postUser);

module.exports = registerRouter;
