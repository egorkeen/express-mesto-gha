// загрузить базовые импорты
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');

// создать приложение
const app = express();

// загрузить роут
const routes = require('./routes');

// загрузить центральный обработчик ошибок
const handleErrors = require('./middlewares/handleErrors');

// создать порт
const { PORT = 3000 } = process.env;

// использовать middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// использовать роут
app.use(routes);

// создать middleware для несуществующих страниц
app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

// подключить отслеживание ошибок
app.use(errors());
app.use(handleErrors);

// подключиться к базе данных
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// запустить сервер
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
