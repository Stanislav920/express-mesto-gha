const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../utils/repsone-errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Для доступа необходимо выполнить авторизацию'));
  }

  let payload;

  const userToken = authorization.replace('Bearer', '');

  try {
    payload = jwt.verify(userToken, 'super-secret');
  } catch (_) {
    return next(new UnauthorizedError('Для доступа необходимо выполнить авторизацию'));
  }

  req.user = payload;
  next();
};
