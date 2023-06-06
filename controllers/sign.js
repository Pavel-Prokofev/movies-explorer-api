const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

const User = require('../models/user');
const {
  statusCreatingOk,
  orFailFunction,
} = require('../utils/errorsHandler');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  if (password.length < 7) {
    throw orFailFunction('ValidationError');
  } else {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name, email, password: hash,
      }))
      .then((newUser) => {
        res.status(statusCreatingOk).send({
          name: newUser.name,
          email: newUser.email,
          _id: newUser._id,
        });
      })
      .catch(next);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
};
