const routers = require('express').Router();

const auth = require('../middlewares/auth');
const signRouter = require('./sign');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const NotFoundError = require('../utils/errors/NotFoundError');
const { notFoundUrlText } = require('../utils/constants');

routers.use('/', signRouter);

routers.use('/users', auth, usersRouter);
routers.use('/movies', auth, moviesRouter);
routers.use('*', auth, (req, res, next) => {
  next(new NotFoundError(notFoundUrlText));
});

module.exports = routers;
