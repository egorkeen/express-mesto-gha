// импортируем все необходимое
// express, b-p, mongoose
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handle-error');
// app
const app = express();
// роуты
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/sign-in');
const registerRouter = require('./routes/sign-up');

// создаем порт
const PORT = process.env.PORT || 3000;
// миддлвэры
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// используем все роуты
app.use(cardsRouter);
app.use(usersRouter);
app.use(loginRouter);
app.use(registerRouter);
// задействуем авторизацию
app.use(auth);
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
