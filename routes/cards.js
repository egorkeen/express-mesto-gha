const cardRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const celebrate = require('../middlewares/celebrate');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', celebrate.celebrateCreateCard, createCard);
cardRouter.delete('/cards/:cardId', celebrate.celebrateCheckCardId, deleteCard);
cardRouter.put('/cards/:cardId/likes', celebrate.celebrateCheckCardId, likeCard);
cardRouter.delete('/cards/:cardId/likes', celebrate.celebrateCheckCardId, dislikeCard);

module.exports = cardRouter;
