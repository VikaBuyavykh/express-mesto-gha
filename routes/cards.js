const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  createCard, deleteCard, getCards, likeCard, dislikeCard,
} = require('../controllers/cards');

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), deleteCard);
cardRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(https?:\/\/)([w]{3}\.)?([\w-.~:/?#[\]@!$&'()*+,;=]{1,}\.[\w]{1,3})(\/[\w-.~:/?#[\]@!$&'()*+,;=]{1,})*/i),
  }),
}), createCard);
cardRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), likeCard);
cardRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), dislikeCard);

module.exports = cardRouter;
