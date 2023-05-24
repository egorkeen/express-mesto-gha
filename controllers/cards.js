const Card = require('../models/card');

// получить все карточки
module.exports.getCards = (req, res) => {
  Card.find()
    .then((cards) => {
      res.json(cards);
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

// удалить карточку
// eslint-disable-next-line consistent-return
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  if (!cardId) {
    return res.status(400).json({ message: 'Некорректный id карточки' });
  }

  Card.findByIdAndRemove(cardId)
    .then((deletedCard) => {
      if (!deletedCard) {
        return res.status(404).json({ message: 'Карточка не найдена' });
      }
      return res.status(200).json({ message: 'Карточка успешно удалена' });
    })
    .catch((err) => res.status(500).json({ message: err }));
};

// создать карточку
module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const userId = req.user;

  Card.create({ name, link, owner: userId })
    .then((createdCard) => {
      res.status(201).send({ data: createdCard });
      console.log('Запрос успешно выполен!');
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
};

// лайкнуть карточку
// eslint-disable-next-line consistent-return
module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.user;

  if (!cardId) {
    return res.status(400).json({ message: 'Некорректный id карточки' });
  }

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
    .catch((err) => res.status(500).json({ message: err }));
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
      return res.status(200).json(updatedCard);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
