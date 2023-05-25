const User = require('../models/user');

// получить список всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

// получить конкретного пользователя по id
module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.find({ _id: id })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send(user);
    })
    .catch(() => {
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
    .catch(() => {
      res.status(500).send({ message: 'Переданы некорректные данные при создании пользователя' });
    });
};

// обновить данные профиля
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send(updatedUser);
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    });
};

// обновить аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((updatedAvatar) => {
      if (!updatedAvatar) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.send(updatedAvatar);
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    });
};
