const regexUrl = /(?:https?|ftp)(?::\/\/)(?:(?:[а-яa-z0-9]{1}[а-яa-z0-9-]*)\.){1,}(?:(?:(?:[a-z])+)|(?:(?:[а-я])+))(?:$|(?:\/(?:$|(?:[а-яa-z0-9#?]+[а-яa-z0-9._~:?#[\]@!$&'()*+,;=%-]*))))*$/im;

const { NODE_ENV } = process.env;

const JWT_SECRET = (NODE_ENV === 'production' && process.env.JWT_SECRET) ? process.env.JWT_SECRET : 'some-superSecret-key';

const DB = (NODE_ENV === 'production' && process.env.DB) ? process.env.DB : 'mongodb://127.0.0.1/bitfilmsdb';

const PORT = (NODE_ENV === 'production' && process.env.PORT) ? process.env.PORT : 3003;

module.exports = {
  regexUrl,
  PORT,
  DB,
  JWT_SECRET,
};
