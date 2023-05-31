const registerRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { postUser } = require('../controllers/users');

registerRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), postUser);

module.exports = registerRouter;
