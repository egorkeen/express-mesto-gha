const mongoose = require('mongoose');
// схема пользователя
const userSchema = mongoose.Schema({
  // имя
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  // информация
  about: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  // ссылка на аватар
  avatar: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
