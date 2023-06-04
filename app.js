// импортируем все необходимое
// express, b-p, mongoose
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const handleErrors = require('./middlewares/handleErrors');

// app
const app = express();

// роуты
const cardRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const signInRouter = require('./routes/sign-in');
const signUpRouter = require('./routes/sign-up');
const auth = require('./middlewares/auth');

// ошибка 404
const NotFoundError = require('./errors/NotFoundError');

// создаем порт
const PORT = process.env.PORT || 3000;
// миддлвэр
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// используем все роуты
app.use(signInRouter);
app.use(signUpRouter);
app.use(auth, cardRouter);
app.use(auth, userRouter);

// отслеживаем ошибки
// создаем миддлуэр на случай несуществующей страницы
app.use(auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errors());
app.use(handleErrors);

// подключение к базе данных
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
// запуск сервера на порту
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
