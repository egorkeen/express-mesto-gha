const User = require('../models/user');

// получить список всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

// получить конкретного пользователя по id
module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(400)
          .send({ message: 'Передан некорректный id пользователя' });
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

// создать пользователя
module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

// обновить данные профиля
module.exports.updateProfile = (req, res) => {
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
        res.status(404).send({ message: 'Пользователь не найден' });
        return;
      }
      res.status(200).send(updatedUser);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный id пользователя' });
        return;
      } if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные для обновления профиля' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

// обновить аватар
module.exports.updateAvatar = (req, res) => {
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
        res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.send(updatedAvatar);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан некорректный id пользователя' });
        return;
      } if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные для обновления аватара' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};
