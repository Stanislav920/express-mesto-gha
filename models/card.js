// models/user.js
const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    validate: {
      validator: (correct) => validator.isUrl(correct),
      message: 'Ошибка при передачи изображения',
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: 'user',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('card', cardSchema);
