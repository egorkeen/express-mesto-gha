const Card = require('../models/card');

// получить все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.json({ data: cards }))
    .catch(() => res.status(500).json({ message: 'Ошибка сервера' }));
};

// удалить карточку
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((deletedCard) => {
      if (!deletedCard) {
        return res.status(404).json({ message: 'Карточка не найдена' });
      }
      return res.status(200).json({ data: deletedCard });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).json({ message: 'Передан неверный id карточки' });
      }
      res.status(500).json({ message: 'Ошибка сервера' });
    });
};

// создать карточку
module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((createdCard) => {
      res.status(201).json({ data: createdCard });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).json({ message: 'Переданы некорректные данные' });
      }
      res.status(500).json({ message: 'Ошибка сервера' });
    });
};

// лайкнуть карточку
module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        return res.status(404).json({ message: 'Карточка не найдена' });
      }
      return res.status(200).json({ data: updatedCard });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: 'Несуществующий id карточки' });
      } else if (err.name === 'ValidationError') {
        res.status(400).json({ message: 'Переданы неверные данные' });
      }
      res.status(500).json({ message: 'Ошибка сервера' });
    });
};

// убрать лайк карточки
// eslint-disable-next-line consistent-return
module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.user;

  if (!cardId) {
    return res.status(400).json({ message: 'Некорректный id карточки' });
  }

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        return res.status(404).json({ message: 'Карточка не найдена' });
      }
      return res.status(200).json({ data: updatedCard });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: 'Несуществующий id карточки' });
      } else if (err.name === 'ValidationError') {
        res.status(400).json({ message: 'Переданы неверные данные' });
      }
      res.status(500).json({ message: 'Ошибка сервера' });
    });
};
