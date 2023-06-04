const usersRouter = require('express').Router();

const {
  returnThisUser,
  userDataChange,
} = require('../controllers/users');

usersRouter.get('/me', returnThisUser);

usersRouter.patch('/me', userDataChange);

module.exports = usersRouter;
