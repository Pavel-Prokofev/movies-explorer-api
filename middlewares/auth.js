const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

const { orFailFunction } = require('../utils/errorsHandler');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(orFailFunction('InvalidAuthorizationJwt'));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      next();
    } catch (error) {
      next(orFailFunction('InvalidAuthorizationJwt'));
    }
  }
};
