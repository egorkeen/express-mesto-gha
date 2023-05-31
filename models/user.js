const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// схема пользователя
const userSchema = mongoose.Schema({
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
    validate: /^https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/,
  },
  // e-mail
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Некорректный e-mail адрес',
    },
    unique: true,
  },
  // пароль
  password: {
    type: String,
    minLength: 8,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
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
