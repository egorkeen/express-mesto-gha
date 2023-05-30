// express, b-p, mongoose
const express = require('express');
const mongoose = require('mongoose');
const errors = require('celebrate');
const bodyParser = require('body-parser');
const { login, postUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handle-error');
// app
const app = express();
// роуты
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
// порт
const PORT = process.env.PORT || 3000;
// миддлвэры
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cardsRouter);
app.use(usersRouter);
app.use(auth);
app.use((req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});
app.use(errors());
app.use(handleError);

app.post('/signin', login);
app.post('/signup', postUser);
// подключение к базе данных
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
// запуск сервера на порту
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
