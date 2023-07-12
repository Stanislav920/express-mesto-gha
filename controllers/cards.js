const mongoose = require('mongoose');

const { ValidationError, CastError } = mongoose.Error;

const Card = require('../models/card');

// Константы ошибок.

const createError = 201;
const BadRequestsError = 400;
const internalServerError = 500;

// Создание карточки.

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(createError).send(card))
    .catch((err) => {
      if (err.name instanceof ValidationError) {
        return res.status(BadRequestsError).send({ message: 'переданы некорректные данные карточки' });
      }
      return res.status(internalServerError).send({ message: 'Произошла ошибка на сервере' });
    });
};

// Добавление карточки.

module.exports.getCards = (req, res) => {
  Card.find({}).populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch(() => res.status(internalServerError).send({ message: 'Произошла ошибка' }));
};

// Удаление карточки.

module.exports.deleteCardById = (req, res) => {
  Card.findById(req.params.cardId)
    .then((card) => card.deleteOne().then(() => res.send({ message: 'Карточка удалена' })))
    .catch((err) => {
      if (err.name instanceof CastError) {
        return res.status(BadRequestsError).send({ message: 'переданы некорректные данные карточки' });
      }
      return res.status(internalServerError).send({ message: 'Произошла ошибка на сервере' });
    });
};

// Поставить лайк карточки.

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name instanceof CastError) {
        return res.status(BadRequestsError).send({ message: 'переданы некорректные данные карточки' });
      }
      return res.status(internalServerError).send({ message: 'Произошла ошибка на сервере' });
    });
};

// Удалить лайк карточки.

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { new: true })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name instanceof CastError) {
        return res.status(BadRequestsError).send({ message: 'переданы некорректные данные карточки' });
      }
      return res.status(internalServerError).send({ message: 'Произошла ошибка на сервере' });
    });
};
