const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

module.exports.celebrateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.celebrateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/),
  }),
});

module.exports.celebrateGetUserById = celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
});

module.exports.celebrateUpdateUserProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.celebrateUpdateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^https?:\/\/(?:[a-z0-9\\-]+\.)+[a-z]{2,6}(?:\/[^/#?]+)+\.(?:jpe?g|gif|png|bmp|webp)$/im),
  }),
});

module.exports.celebrateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\\/~+#-]*[\w@?^=%&\\/~+#-])/im),
  }),
});

module.exports.celebrateDeleteCard = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
});
