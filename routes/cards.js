const cardsRouter = require('express').Router();
const {
  getCards,
  deleteCard,
  postCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

cardsRouter.get('/cards', auth, getCards);
cardsRouter.delete('/cards/:cardId', auth, deleteCard);
cardsRouter.post('/cards', auth, postCard);
cardsRouter.put('/cards/:cardId/likes', auth, likeCard);
cardsRouter.delete('/cards/:cardId/likes', auth, dislikeCard);

module.exports = cardsRouter;
