const signUpRouter = require('express').Router();

const { createUser } = require('../controllers/users');

const celebrate = require('../middlewares/celebrate');

signUpRouter.post('/signup', celebrate.celebrateCreateUser, createUser);

module.exports = signUpRouter;
