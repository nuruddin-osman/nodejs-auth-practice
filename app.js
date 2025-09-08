const express = require("express");
const ejs = require("ejs");
const cors = require("cors");
require("./config/database");

const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("trust proxy", 1);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.CONNECT_DB,
      collectionName: "sessions",
    }),
    // cookie: { secure: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.status(201).render("login");
});
app.post("/login", (req, res) => {
  res.status(201).send("sucess");
});
app.post("/profile", (req, res) => {
  res.status(200).send("sucess");
});

module.exports = app;
