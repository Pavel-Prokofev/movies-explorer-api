const signRouter = require('express').Router();

const {
  createUser,
  login,
} = require('../controllers/sign');

const {
  createUserValidation,
  loginValidation,
} = require('../middlewares/validationJoi');

signRouter.post('/signup', createUserValidation, createUser);

signRouter.post('/signin', loginValidation, login);

module.exports = signRouter;
