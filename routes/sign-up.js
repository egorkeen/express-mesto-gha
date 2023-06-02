const SignUpRouter = require('express').Router();

const { createUser } = require('../controllers/users');

const { celebrateCreateUser } = require('../middlewares/celebrate');

SignUpRouter.post('/signup', celebrateCreateUser, createUser);

module.exports = SignUpRouter;
