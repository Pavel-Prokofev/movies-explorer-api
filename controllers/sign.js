const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/constants');

const User = require('../models/user');

const { statusCreatingOk } = require('../utils/constants');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((newUser) => {
      const newUserEdited = JSON.parse(JSON.stringify(newUser));
      delete newUserEdited.password;
      const token = jwt.sign({ _id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(statusCreatingOk).send({ user: newUserEdited, token });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials({ email, password })
    .then((user) => {
      const userEdited = JSON.parse(JSON.stringify(user));
      delete userEdited.password;
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({ user: userEdited, token });
    })
    .catch(next);
};

module.exports = {
  login,
  createUser,
};
