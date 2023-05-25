// express, b-p, mongoose
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

app.use((req, res, next) => {
  req.user = {
    _id: '64687fa9f53449a18bc708c6',
  };

  next();
});
// подключение к базе данных
mongoose.connect('mongodb://localhost:27017/mestodb');
// запуск сервера на порту
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
