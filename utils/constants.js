const regexUrl = /(?:https?|ftp)(?::\/\/)(?:(?:[а-яa-z0-9]{1}[а-яa-z0-9-]*)\.){1,}(?:(?:(?:[a-z])+)|(?:(?:[а-я])+))(?:$|(?:\/(?:$|(?:[а-яa-z0-9#?]+[а-яa-z0-9._~:?#[\]@!$&'()*+,;=%-]*))))*$/im;

const { NODE_ENV } = process.env;

const JWT_SECRET = (NODE_ENV === 'production' && process.env.JWT_SECRET) ? process.env.JWT_SECRET : 'some-superSecret-key';

const DB = (NODE_ENV === 'production' && process.env.DB) ? process.env.DB : 'mongodb://127.0.0.1/bitfilmsdb';

const PORT = (NODE_ENV === 'production' && process.env.PORT) ? process.env.PORT : 3003;

const validationErrorText = 'Переданы некорректные данные.';
const castErrorText = 'Передан некорректнй id.';
const invalidAuthorizationText = 'Неверные почта или пароль.';
const invalidAuthorizationJwtText = 'Необходима авторизация.';
const forbiddenText = 'У вас нет прав на удаление этого фильма.';
const notFoundText = 'По указанному _id ничего не найдено.';
const notFoundUrlText = 'Неверный URl запроса.';
const emailNotUniqueText = 'Такая почта уже зарегистрирована.';
const moviesNotUniqueText = 'Этот филь уже добавлен в избранное данным пользователем.';
const serverErrorText = 'На сервере произошла ошибка.';

const statusCreatingOk = 201;

module.exports = {
  regexUrl,
  PORT,
  DB,
  JWT_SECRET,
  validationErrorText,
  castErrorText,
  invalidAuthorizationText,
  invalidAuthorizationJwtText,
  forbiddenText,
  notFoundText,
  notFoundUrlText,
  emailNotUniqueText,
  moviesNotUniqueText,
  serverErrorText,
  statusCreatingOk,
};
