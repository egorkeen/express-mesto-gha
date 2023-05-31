const registerRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { postUser } = require('../controllers/users');

registerRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), postUser);

module.exports = registerRouter;