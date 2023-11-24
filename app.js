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
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);
app.use(router);

app.use(errors());

app.use((err, req, res) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
