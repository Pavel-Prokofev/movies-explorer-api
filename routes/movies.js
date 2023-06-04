const moviesRouter = require('express').Router();

const {
  returnAllMoviesThisUser,
  createMovie,
  dellMovieById,
} = require('../controllers/movies');

moviesRouter.get('/', returnAllMoviesThisUser);

moviesRouter.post('/', createMovie);

moviesRouter.delete('/:_id', dellMovieById);

module.exports = moviesRouter;
