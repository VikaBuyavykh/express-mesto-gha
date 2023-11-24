require('dotenv').config();

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const router = require('./routes');
const { createUser, login } = require('./controllers/users');

const app = express();

mongoose.connect(MONGO_URL);

app.use(json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    avatar: Joi.string().pattern(/(https?:\/\/)([w]{3}\.)?([\w-.~:/?#[\]@!$&'()*+,;=]{1,}\.[\w]{1,3})(\/[\w-.~:/?#[\]@!$&'()*+,;=]{1,})*/i),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    avatar: Joi.string().pattern(/(https?:\/\/)([w]{3}\.)?([\w-.~:/?#[\]@!$&'()*+,;=]{1,}\.[\w]{1,3})(\/[\w-.~:/?#[\]@!$&'()*+,;=]{1,})*/i),
  }),
}), createUser);
app.use(router);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
