require('dotenv').config();

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

mongoose.connect(MONGO_URL);

app.use(json());

app.use((req, res, next) => {
  req.user = {
    _id: '65476eefe590b5042e11ab4c',
  };

  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
