const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const chalk = require("chalk"); // логер
const morgan = require("morgan"); // еще логер
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const errorMsg = chalk.bgKeyword("white").redBright;
const successMsg = chalk.bgKeyword("green").white;

const app = express();

const PORT = 3005;
// const password = "0000";
// const db = `mongodb+srv://george:${password}@cluster0.nehn5.mongodb.net/node-blog?retryWrites=true&w=majority`;

// для защиты
// process это глобальная переменная доступная благодаря модулю dotenv(смотри файл .env)
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const db = `mongodb+srv://${user}:${password}@cluster0.nehn5.mongodb.net/node-blog?retryWrites=true&w=majority`;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log(successMsg("connected to db")))
  .catch((error) => console.log(errorMsg(error)));

app.use(cors());

app.use(
  "/",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`app started on port: ${PORT}`);
});

// middleware
// если middleware должны срабатывать между запросом и ответом, нужно определять в самом начале до создания роутов с ответами(например app.get)
// next возвращает контроль серверу
// app.use((req, res, next) => {
//   console.log(`path: ${req.path}`);
//   console.log(`method: ${req.method}`);
//   next();
// });

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// метод urlencoded используется для парсинга
// extended: false отменяет расширенный парсинг
app.use(express.urlencoded({ extended: false }));

// метод static добавляет указанную папку в исключения (т.е. сделать ее общедоступной это значит клиент может получить к ней доступ)
app.use(express.static("styles"));

// методы в express принимают 2 основных параметра
// 1)root - путь по которому идет обращение
// 2)callback функция - которая будет вызываться
