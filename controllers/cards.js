const Card = require('../models/card');

// получить все карточки
module.exports.getCards = (req, res) => {
  Card.find()
    .then((cards) => {
      res.json(cards);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

// удалить карточку
module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((deletedCard) => {
      if (!deletedCard) {
        return res.status(404).json({ message: 'Карточка не найдена' });
      }
      return res.status(200).json({ message: 'Карточка успешно удалена' });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

// создать карточку
module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((createdCard) => {
      res.status(201).json(createdCard);
      console.log('Запрос успешно выполен!');
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

// лайкнуть карточку
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        return res.status(404).json({ message: 'Карточка не найдена' });
      }
      return res.status(200).json(updatedCard);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

// убрать лайк карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((updatedCard) => {
      if (!updatedCard) {
        return res.status(404).json({ message: 'Карточка не найдена' });
      }
      return res.status(200).json(updatedCard);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};
