const Card = require('../models/card');

const createCard = async (req, res) => {
  try {
    const newCard = await new Card({name: req.body.name, link: req.body.link, owner: req.user._id});
    await newCard.save();
    const {likes, _id, name, link, owner, createdAt} = newCard;
    return res.status(201).send({likes, _id, name, link, owner, createdAt});
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Ошибка валидации полей' });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};

const getCards = async (req, res) => {
  try {
    return res.send(cards);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};

const deleteCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (deletedCard === null) {
      throw new Error('Карточка не найдена');
    }
    return res.send({Message: 'Пост удален'});
  } catch (error) {
    if (error.message === 'Карточка не найдена' || error.name === 'CastError') {
      return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
}

const likeCard = async (req, res) => {
  try {
    const likedCard = await Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true });
    if (likedCard === null) {
      throw new Error('Карточка не найдена');
    }
    const {likes, _id, name, link, owner, createdAt} = likedCard;
    return res.send({likes, _id, name, link, owner, createdAt});
  } catch (error) {
    if (error.message === 'Карточка не найдена' || error.name === 'CastError') {
      return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
}

const dislikeCard = async (req, res) => {
  try {
    const dislikedCard = await Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true });
    if (dislikedCard === null) {
      throw new Error('Карточка не найдена');
    }
    const {likes, _id, name, link, owner, createdAt} = dislikedCard;
    return res.send({likes, _id, name, link, owner, createdAt});
  } catch (error) {
    if (error.message === 'Карточка не найдена' || error.name === 'CastError') {
      return res.status(404).send({ message: 'Запрашиваемая карточка не найдена' });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
}

module.exports = { createCard, deleteCard, getCards, likeCard, dislikeCard };