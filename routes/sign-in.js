const loginRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');

loginRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), login);

module.exports = loginRouter;
