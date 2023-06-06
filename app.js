require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { PORT, DB } = require('./utils/constants');
const { limiter } = require('./utils/limiter');
const { errorsHandler } = require('./utils/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/allowedCors');

const routers = require('./routes/index');

const app = express();

mongoose.connect(DB)
  .then(() => console.log('Успешное подключение к:', DB))
  .catch((err) => console.log('Ошибка подключения:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.use(helmet());

app.use(cors);

app.use(requestLogger);

app.use(routers);

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT, (err) => {
  if (err) {
    console.log('Ошибка запуска сервера');
  } else {
    console.log(`Сервер успешно запущен на порте: ${PORT}`);
  }
});
