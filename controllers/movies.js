const Movie = require('../models/movie');

const NotFoundError = require('../utils/errors/NotFoundError');
const Forbidden = require('../utils/errors/Forbidden');
const NotUnique = require('../utils/errors/NotUnique');
const {
  notFoundText,
  forbiddenText,
  moviesNotUniqueText,
  statusCreatingOk,
} = require('../utils/constants');

const createMovie = (req, res, next) => {
  const {
    movieId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.findOne({ movieId, owner })
    .then((desiredMovie) => {
      if (desiredMovie) {
        throw new NotUnique(moviesNotUniqueText);
      } else {
        Movie.create({
          movieId,
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          thumbnail,
          nameRU,
          nameEN,
          owner,
        })
          .then((newMovie) => res.status(statusCreatingOk).send(newMovie))
          .catch(next);
      }
    })
    .catch(next);
};

const dellMovieById = (req, res, next) => {
  Movie.findOne({ _id: req.params._id })
    .orFail(() => { throw new NotFoundError(notFoundText); })
    .then((movie) => {
      const owner = req.user._id;
      const right = String(movie.owner) === owner;
      if (!right) {
        throw new Forbidden(forbiddenText);
      } else {
        Movie.deleteOne(movie)
          .then(() => res.send({ message: 'Фильм удалён из избранного' }))
          .catch(next);
      }
    })
    .catch(next);
};

const returnAllMoviesThisUser = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((allMoviesThisUser) => {
      res.send(allMoviesThisUser);
    })
    .catch(next);
};

module.exports = {
  returnAllMoviesThisUser,
  createMovie,
  dellMovieById,
};
