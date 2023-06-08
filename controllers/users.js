const User = require('../models/user');

const NotFoundError = require('../utils/errors/NotFoundError');
const { notFoundText } = require('../utils/constants');

const returnThisUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError(notFoundText); })
    .then((user) => res.send(user))
    .catch(next);
};

const userDataChange = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => { throw new NotFoundError(notFoundText); })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  returnThisUser,
  userDataChange,
};
