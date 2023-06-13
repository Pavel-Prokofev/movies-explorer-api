const moviesRouter = require('express').Router();

const {
  returnAllMoviesThisUser,
  createMovie,
  dellMovieById,
} = require('../controllers/movies');

const {
  createMovieValidation,
  paramsMovieIdValidation,
} = require('../middlewares/validationJoi');

moviesRouter.get('/', createMovieValidation, returnAllMoviesThisUser);

moviesRouter.post('/', createMovie);

moviesRouter.delete('/:_id', paramsMovieIdValidation, dellMovieById);

module.exports = moviesRouter;
