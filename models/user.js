// models/user.js
const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    minLength: 5,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: true,
    validate: {
      validator: (correct) => validator.isUrl(correct),
      message: 'Почта пользователя введена неверно',
    }
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 40,
    validate: {
      validator: (correct) => validator.isEmail(correct),
      message: 'Почта пользователя введена неверно',
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
  }
});

module.exports = mongoose.model('user', userSchema);
