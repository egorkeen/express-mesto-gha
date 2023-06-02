const jwt = require('jsonwebtoken');
const AuthorizeError = require('../errors/AuthorizeError');

module.exports = (req, res, next) => {
  const authorization = req.headers.cookie;

  if (!authorization) {
    return next(new AuthorizeError('Что-то не так'));
  }

  const token = authorization.replace('authorization=', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new AuthorizeError('Неправильные почта или пароль'));
  }
  req.user = payload;
  return next();
};
