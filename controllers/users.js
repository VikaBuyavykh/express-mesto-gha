const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const newUser = await new User(req.body);
    return res.status(201).send(await newUser.save());
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Ошибка валидации полей' });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.send(users);
  } catch (error) {
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Такого пользователя не существует');
    }
    const { name, about, avatar, _id } = user;
    return res.status(200).send({ name, about, avatar, _id });
  } catch (error) {
    if (error.message === 'Такого пользователя не существует' || error.name === 'CastError') {
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
}

const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {name: req.body.name, about: req.body.about}, { new: true, runValidators: true });
    if (user === null) {
      throw new Error('Такого пользователя не существует');
    } else {
      const { name, about, avatar, _id } = user;
      return res.send({ name, about, avatar, _id });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданные данные некорректны' });
    }
    if (error.message === 'Такого пользователя не существует') {
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
}

const updateAvatar = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, {avatar: req.body.avatar}, { new: true, runValidators: true });
    if (user !== null) {
      const { name, about, avatar, _id } = user;
      return res.send({ name, about, avatar, _id });
    } else {
      throw new Error('Такого пользователя не существует');
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданные данные некорректны' });
    }
    if (error.message === 'Такого пользователя не существует') {
      return res.status(404).send({ message: 'Запрашиваемый пользователь не найден' });
    }
    return res.status(500).send({ message: 'Ошибка на стороне сервера' });
  }
}

module.exports = { createUser, getUserById, getUsers, updateProfile, updateAvatar };