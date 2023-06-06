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

moviesRouter.get('/', returnAllMoviesThisUser);

moviesRouter.post('/', createMovieValidation, createMovie);

moviesRouter.delete('/:_id', paramsMovieIdValidation, dellMovieById);

module.exports = moviesRouter;
