const User = require('../models/user');

// получить список всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ users });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

// получить конкретного пользователя по id
module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден.' });
      }
      return res.send({ user });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

// создать пользователя
module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ user });
      console.log('Запрос выполнен успешно!');
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
};

// обновить данные профиля
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).send({ message: 'Пользователь не найден.' });
      }
      return res.status(200).send(updatedUser);
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
};

// обновить аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((updatedAvatar) => {
      if (!updatedAvatar) {
        return res.status(404).send({ message: 'Пользователь не найден.' });
      }
      return res.status(200).send(updatedAvatar);
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
};
