const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require('path')

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// const redis=require('redis')
// const RedisStore=require('connect-redis')(session)
// const client = redis.createClient()

mongoose.connect('mongodb+srv://datauser:neJNDDYBoEGvopZ6@cluster0-qyjcg.mongodb.net/stube?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise
const db = mongoose.connection

const dogsFoundRouter = require("./routes/adverts/found");
const dogsLostRouter = require("./routes/adverts/lost");
const matchesRouter = require("./routes/adverts/matches");
const accountRouter = require("./routes/account/account");
const RegistrationRouter = require("./routes/users/registration");
const LoginRouter = require("./routes/users/login");
const LogoutRouter = require("./routes/users/logout");
const AuthRouter = require("./routes/users/auth");
const imageRouter = require("./routes/imagerouter/imagerouter");

const app = express();

app.use(session({
  store: new MongoStore({
    mongooseConnection: db,
  }),
  key: 'user_sid',
  secret: 'oh klahoma',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cookieParser());

// Установка заголовков запросов
app.use(require("./middleware/headers"));

app.use("/api/found", dogsFoundRouter);
app.use("/api/lost", dogsLostRouter);
app.use("/api/account", accountRouter);
app.use("/api/matches", matchesRouter);
app.use("/api/users/registration", RegistrationRouter);
app.use("/api/users/login", LoginRouter);
app.use("/api/users/logout", LogoutRouter);
app.use("/api/users/auth", AuthRouter);
app.use("/api/images", imageRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})

module.exports = app;
