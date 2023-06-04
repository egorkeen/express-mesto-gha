// импортировать необходимые файлы
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const NoRightsError = require('../errors/NoRightsError');
const InaccurateDataError = require('../errors/InaccurateDataError');

// получить все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

// создать карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({
    name,
    link,
    owner,
  })
    .then((createdCard) => {
      res.send(createdCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InaccurateDataError('Переданы некорректные данные для создания карточки'));
      } else {
        next(err);
      }
    });
};

// удалить карточку
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }

      if (card.owner.toString() !== req.user._id) {
        throw new NoRightsError('Нет прав для удаления карточки');
      }

      return Card.findByIdAndRemove(cardId)
        .populate(['owner', 'likes'])
        .then((myCard) => {
          res.send({ data: myCard });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new InaccurateDataError('Некорректный id карточки'));
      }

      return next(err);
    });
};

// поставить лайк на карточку
module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: { likes: req.user._id },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с данным id не найдена');
      }

      return res.send(card);
    })
    .catch(next);
};

// убрать лайк на карточку
module.exports.dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с данным id не найдена');
      }

      return res.send(card);
    })
    .catch(next);
};
