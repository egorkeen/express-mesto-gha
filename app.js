// импортируем все необходимое
// express, b-p, mongoose
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const handleError = require('./middlewares/handleErrors');
// app
const app = express();
// роуты
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/sign-in');
const registerRouter = require('./routes/sign-up');
const { auth } = require('./middlewares/auth');

// создаем порт
const PORT = process.env.PORT || 3000;
// миддлвэр
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// используем все роуты
app.use(auth, cardsRouter);
app.use(auth, usersRouter);
app.use(loginRouter);
app.use(registerRouter);
// создаем миддлуэр на случай несуществующей страницы
app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});
// отслеживаем ошибки
app.use(errors());
app.use(handleError);

// подключение к базе данных
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
// запуск сервера на порту
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
