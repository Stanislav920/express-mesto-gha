const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

const { centralizedHandler } = require('./middlewares/centralized-handler');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

// Обрабочек ответа.
app.use(errors());
app.use(centralizedHandler);

app.listen(PORT, () => console.log('Сервер запущен!'));
