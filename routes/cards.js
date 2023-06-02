const CardRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  celebrateCreateCard,
} = require('../middlewares/celebrate');
const { auth } = require('../middlewares/auth');

CardRouter.use(auth);
CardRouter.get('/cards', getCards);
CardRouter.post('/cards', celebrateCreateCard, createCard);
CardRouter.delete('/cards/:cardId', deleteCard);
CardRouter.put('/cards/:cardId/likes', likeCard);
CardRouter.delete('/cards/:cardId/likes', dislikeCard);

module.exports = CardRouter;
