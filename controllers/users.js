const User = require('../models/user');
const { orFailFunction } = require('../utils/errorsHandler');

const returnThisUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw orFailFunction('NotFound'); })
    .then((user) => res.send(user))
    .catch(next);
};

const userDataChange = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => { throw orFailFunction('NotFound'); })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  returnThisUser,
  userDataChange,
};
