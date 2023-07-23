const express = require('express');
const userRouter = require('./users');
const cardRouter = require('./cards');

const NotFoundError = 404;

const router = express.Router();
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res) => {
  res.status(NotFoundError).send({ message: 'Страница не найдена' });
});

module.exports = router;
