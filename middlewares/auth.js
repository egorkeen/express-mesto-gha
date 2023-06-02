const jwt = require('jsonwebtoken');

const AuthorizeError = require('../errors/AuthorizeError');

module.exports.auth = (req, res, next) => {
  const authorization = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizeError('Неверные почта или пароль'));
  }

  const token = authorization.replace('Bearer', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      'some-secret-key',
    );
  } catch (err) {
    next(new AuthorizeError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
