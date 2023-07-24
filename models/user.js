// models/user.js
const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    default: 'Исследователь',
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (correct) => validator.isUrl(correct),
      message: 'Почта пользователя введена неверно',
    }
  },
  email: {
    type: String,
    maxLength: 40,
    validate: {
      validator: (correct) => validator.isEmail(correct),
      message: 'Почта пользователя введена неверно',
    }
  },
  password: {
    type: String,
    select: false,
  }
});

module.exports = mongoose.model('user', userSchema);
