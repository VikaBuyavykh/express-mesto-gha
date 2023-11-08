const { Router } = require("express");
const { createCard, deleteCard, getCards, likeCard, dislikeCard } = require("../controllers/cards");

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.post('/', createCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardRouter;