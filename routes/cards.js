const cardsRouter = require('express').Router();
const {
  getCards,
  deleteCard,
  postCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

cardsRouter.get('/cards', getCards);
cardsRouter.delete('/cards/:cardId', deleteCard);
cardsRouter.post('/cards', auth, postCard);
cardsRouter.put('/cards/:cardId/likes', likeCard);
cardsRouter.delete('/cards/:cardId/likes', dislikeCard);
cardsRouter.use(auth);

module.exports = cardsRouter;
