const ValidationError = require('./errors/ValidationError');
const NotUnique = require('./errors/NotUnique');

const {
  validationErrorText,
  castErrorText,
  emailNotUniqueText,
  serverErrorText,
} = require('./constants');

const identificationError = (err) => {
  if (err.name === 'ValidationError') {
    return new ValidationError(validationErrorText);
  }
  if (err.name === 'CastError') {
    return new ValidationError(castErrorText);
  }
  if (err.code === 11000) {
    return new NotUnique(emailNotUniqueText);
  }
  return err;
};

const errorsHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = identificationError(err);
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? serverErrorText
        : message,
    });
  next();
};

module.exports = {
  errorsHandler,
};
