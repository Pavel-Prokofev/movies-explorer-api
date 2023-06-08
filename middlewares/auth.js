const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/constants');

const InvalidAuthorization = require('../utils/errors/InvalidAuthorization');
const { invalidAuthorizationJwtText } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new InvalidAuthorization(invalidAuthorizationJwtText));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
      req.user = payload;
      next();
    } catch (error) {
      next(new InvalidAuthorization(invalidAuthorizationJwtText));
    }
  }
};
