const Card = require('../models/card');

// получить все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

// удалить карточку
// eslint-disable-next-line consistent-return
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  if (!cardId) {
    return res.status(400).send({ message: 'Некорректный id карточки' });
  }

  Card.findByIdAndRemove(cardId)
    .then((deletedCard) => {
      if (!deletedCard) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ message: 'Карточка успешно удалена' });
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

// создать карточку
module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((createdCard) => {
      res.status(201).send(createdCard);
    })
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные' });
    });
};

// лайкнуть карточку
// eslint-disable-next-line consistent-return
module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.user;

  if (!cardId) {
    return res.status(400).send({ message: 'Некорректный id карточки' });
  }

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send({ data: updatedCard });
    })
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

// убрать лайк карточки
// eslint-disable-next-line consistent-return
module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.user;

  if (!cardId) {
    return res.status(400).send({ message: 'Некорректный id карточки' });
  }

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.send(updatedCard);
    })
    .catch(() => {
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};
