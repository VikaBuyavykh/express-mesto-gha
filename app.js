const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const handleError = require('./middlewares/handleError');

const PORT = 3000;
const MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb';

const app = express();

mongoose.connect(MONGO_URL);

app.use(json());

app.use(router);

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
