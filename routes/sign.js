const signRouter = require('express').Router();

const {
  createUser,
  login,
} = require('../controllers/sign');

signRouter.post('/signup', createUser);

signRouter.post('/signin', login);

module.exports = signRouter;
