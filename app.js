const express = require('express');
const mongoose = require('mongoose');

const { identificationError } = require('./utils/errorsHandler');

const routers = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1/bitfilmsdb')
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((err) => console.log('Ошибка подключения:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routers);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = identificationError(err);
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка.'
        : message,
    });
  next();
});

app.listen(PORT, (err) => {
  if (err) {
    console.log('Ошибка запуска сервера');
  } else {
    console.log(`Сервер успешно запущен на порте: ${PORT}`);
  }
});
