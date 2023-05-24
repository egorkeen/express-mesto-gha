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
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((deletedCard) => {
      if (!deletedCard) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(200).send({ message: 'Карточка успешно удалена' });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
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
module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(200).send({ data: updatedCard });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

// убрать лайк карточки
module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { userId } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(200).send({ data: updatedCard });
    })
    .catch((err) => {
      res.status(400).send({ message: err });
    });
};
