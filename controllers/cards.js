const Card = require('../models/card');

// получить все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

// удалить карточку
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((deletedCard) => {
      if (!deletedCard) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.status(200).send(deletedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан неверный id карточки' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

// создать карточку
module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((createdCard) => {
      res.status(201).send(createdCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
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
        res.status(400).send({ message: 'Переданы неверные данные' });
        return;
      }
      res.send(updatedCard);
    })
    .catch((err) => res.status(500).send({ message: 'Ошибка сервера' }));
};

// убрать лайк карточки
module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.user._id;

  if (!cardId) {
    res.status(400).send({ message: 'Некорректный id карточки' });
    return;
  }

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      res.send(updatedCard);
    })
    .catch((err) => res.status(500).send({ message: 'Ошибка сервера' }));
};
