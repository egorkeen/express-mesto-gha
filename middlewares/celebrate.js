const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { URL_REGEX } = require('../utils/constants');

module.exports.celebrateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.celebrateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(true),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URL_REGEX),
  }),
});

module.exports.celebrateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
});

module.exports.celebrateUpdateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(true),
    about: Joi.string().min(2).max(30).required(true),
  }),
});

module.exports.celebrateUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(true).regex(URL_REGEX),
  }),
});

module.exports.celebrateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(true).min(2).max(30),
    link: Joi.string().required(true).regex(URL_REGEX),
  }),
});

module.exports.celebrateCheckCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});
