const routers = require('express').Router();

const auth = require('../middlewares/auth');
const signRouter = require('./sign');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { orFailFunction } = require('../utils/errorsHandler');

routers.use('/', signRouter);

routers.use('/users', auth, usersRouter);
routers.use('/movies', auth, moviesRouter);
routers.use('*', (req, res, next) => {
  next(orFailFunction('NotFoundUrl'));
});

module.exports = routers;
