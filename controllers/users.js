const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const InaccurateDataError = require('../errors/InaccurateDataError');
const AuthorizeError = require('../errors/AuthorizeError');
const ConflictError = require('../errors/ConflictError');

// войти в аккаунт (логин)
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
        const token = jwt.sign(
          { _id: user._id },
          'some-secret-key',
          { expiresIn: '7d' },
        );

        res.status(201).send({ token });
      } else {
        throw new AuthorizeError('Неверный логин или пароль');
      }
    })
    .catch(next);
};

// получить список всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// получить информацию о пользователе
module.exports.getUser = (req, res, next) => {
  User.findById(req.user.payload)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

// получить конкретного пользователя по id
module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new InaccurateDataError('Передан некорректный id пользователя');
      }
      next(err);
    });
};

// создать пользователя
module.exports.postUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create(
        {
          name,
          about,
          avatar,
          email,
          password: hash,
        },
      )
        .then((user) => {
          res.status(201).send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с такой почтой уже существует'));
          } else if (err.name === 'ValidationError') {
            next(new InaccurateDataError('Переданы некорректные данные при создании пользователя'));
          } else {
            next(err);
          }
        });
    });
};

// обновить данные профиля
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    {
      name,
      about,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send(updatedUser);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new InaccurateDataError('Передан некорректный id пользователя');
      } if (err.name === 'ValidationError') {
        throw new InaccurateDataError('Переданы некорректные данные для обновления профиля');
      }
      next(err);
    });
};

// обновить аватар
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((updatedAvatar) => {
      if (!updatedAvatar) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(updatedAvatar);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new InaccurateDataError('Передан некорректный id пользователя');
      } if (err.name === 'ValidationError') {
        throw new InaccurateDataError('Переданы некорректные данные для обновления аватара');
      }
      next(err);
    });
};
