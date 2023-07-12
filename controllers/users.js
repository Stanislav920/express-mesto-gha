const mongoose = require('mongoose');

const { ValidationError, CastError } = mongoose.Error;

const User = require('../models/user');

// Константы ошибок.

const createError = 201;
const BadRequestsError = 400;
const internalServerError = 500;

// Создание пользователя.

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(createError).send(user))
    .catch((err) => {
      if (err.name instanceof ValidationError) {
        return res.status(BadRequestsError).send({ message: 'переданы некорректные данные пользователя' });
      }
      return res.status(internalServerError).send({ message: 'Произошла ошибка на сервере' });
    });
};

// Получение пользователя.

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(() => {
      res.status(internalServerError).send({ message: 'Произошла ошибка на сервере' });
    });
};

// Получение ID пользователя.

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name instanceof CastError) {
        return res.status(BadRequestsError).send({ message: 'переданы некорректные данные пользователя' });
      }
      return res.status(internalServerError).send({ message: 'Произошла ошибка на сервере' });
    });
};

// Обновление профиля.

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name instanceof ValidationError) {
        return res.status(BadRequestsError).send({ message: 'переданы некорректные данные пользователя' });
      }
      return res.status(internalServerError).send({ message: 'Произошла ошибка на сервере' });
    });
};

// Обновление аватара.

module.exports.updateAvatar = (req, res) => {
  const avatar = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, avatar, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name instanceof ValidationError) {
        return res.status(BadRequestsError).send({ message: 'переданы некорректные данные пользователя' });
      }
      return res.status(internalServerError).send({ message: 'Произошла ошибка на сервере' });
    });
};
