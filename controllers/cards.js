const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const NoRightsError = require('../errors/NoRightsError');
const InaccurateDataError = require('../errors/InaccurateDataError');

// получить все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// удалить карточку
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      if (card.owner !== userId) {
        throw new NoRightsError('Нет прав на удаление карточки');
      }

      Card.findByIdAndRemove(cardId)
        .then((deletedCard) => {
          res.status(200).send(deletedCard);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new InaccurateDataError('Передан неверный id карточки');
      }
      next(err);
    });
};

// создать карточку
module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((createdCard) => {
      res.status(201).send(createdCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new InaccurateDataError('Переданы некорректные данные');
      }
      next(err);
    });
};

// лайкнуть карточку
module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    }
    res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new InaccurateDataError('Был передан несуществующий id карточки');
    } else {
      next(err);
    }
  });

// убрать лайк карточки
module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Запрашиваемая карточка не найдена');
    }
    res.send(card);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new InaccurateDataError('Был передан несуществующий id карточки');
    } else {
      next(err);
    }
  });
