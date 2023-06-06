const usersRouter = require('express').Router();

const {
  returnThisUser,
  userDataChange,
} = require('../controllers/users');

const {
  userDataChangeValidation,
} = require('../middlewares/validationJoi');

usersRouter.get('/me', returnThisUser);

usersRouter.patch('/me', userDataChangeValidation, userDataChange);

module.exports = usersRouter;
