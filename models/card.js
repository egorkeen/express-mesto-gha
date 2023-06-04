const mongoose = require('mongoose');
const { URL_REGEX } = require('../utils/constants');

// схема карточки
const cardSchema = mongoose.Schema({
  // имя
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  // ссылка на картинку карточки
  link: {
    type: String,
    required: true,
    validate: {
      validator: URL_REGEX,
      message: 'Необходимо ввести корректный URL',
    },
  },
  // владелец
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // массив лайков
  likes: {
    type: [mongoose.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  // дата создания
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
