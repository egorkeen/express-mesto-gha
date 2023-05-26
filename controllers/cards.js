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
module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      return;
    }
    res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Был передан несуществующий id карточки' });
    } else {
      res.status(500).send({ message: 'Ошибка сервера' });
    }
  });

// убрать лайк карточки
module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
      return;
    }
    res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({ message: 'Был передан несуществующий id карточки' });
    } else {
      res.status(500).send({ message: 'Ошибка сервера' });
    }
  });
