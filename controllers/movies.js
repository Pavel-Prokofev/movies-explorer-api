const Movie = require('../models/movie');
const {
  statusCreatingOk,
  orFailFunction,
} = require('../utils/errorsHandler');

const createMovie = (req, res, next) => {
  const { movieId } = req.body;
  const owner = req.user._id;
  Movie.findOne({ movieId })
    .then((movie) => {
      if (!movie) {
        const {
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
        Movie.create({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          thumbnail,
          movieId,
          owner,
          nameRU,
          nameEN,
        })
          .then((newMovie) => res.status(statusCreatingOk).send(newMovie))
          .catch(next);
      } else {
        Movie.findOneAndUpdate(
          { movieId },
          { $addToSet: { owner } },
          { new: true },
        )
          .then((upMovie) => res.status(statusCreatingOk).send(upMovie))
          .catch(next);
      }
    })
    .catch(next);
};

const dellMovieById = (req, res, next) => {
  Movie.findOne({ movieId: Number(req.params._id) })
    .orFail(() => { throw orFailFunction('NotFound'); })
    .then((movie) => {
      const owner = req.user._id;
      const ownerArrLength = Number(movie.owner.length);
      const right = movie.owner.some((own) => String(own) === owner);
      if (!right) {
        throw orFailFunction('Forbidden');
      } else if (ownerArrLength === 1) {
        Movie.deleteOne(movie)
          .then(() => res.send({ message: 'Фильм удалён из избранного' }))
          .catch(next);
      } else {
        Movie.updateOne(
          movie,
          { $pull: { owner } },
          { new: true },
        )
          .then(() => res.send({ message: 'Фильм удалён из избранного' }))
          .catch(next);
      }
    })
    .catch(next);
};

const returnAllMoviesThisUser = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((allMoviesThisUser) => res.send(allMoviesThisUser))
    .catch(next);
};

module.exports = {
  returnAllMoviesThisUser,
  createMovie,
  dellMovieById,
};
