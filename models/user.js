const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { URL_REGEX } = require('../utils/constants');

// схема пользователя
const userSchema = mongoose.Schema({
  // e-mail
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Некорректный e-mail адрес',
    },
  },
  // пароль
  password: {
    type: String,
    required: true,
    select: false,
  },
  // имя
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  // информация
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  // ссылка на аватар
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: URL_REGEX,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }

          return user;
        });
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
