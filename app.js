const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const formidable = require("formidable");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// const redis=require('redis')
// const RedisStore=require('connect-redis')(session)
// const client = redis.createClient()

mongoose.connect("mongodb://localhost/pet-finder", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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

app.use(
  session({
    store: new MongoStore({
      url: "mongodb://localhost/pet-finder",
      ttl: 10 * 60
    }),
    key: "sniffer",
    secret: "secretcat",
    saveUninitialized: false,
    resave: false
  })
);

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
app.use("/users/registration", RegistrationRouter);
app.use("/users/login", LoginRouter);
app.use("/users/logout", LogoutRouter);
app.use("/users/auth", AuthRouter);
app.use("/api/images", imageRouter);

module.exports = app;
