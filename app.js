const express = require("express");
const ejs = require("ejs");
const cors = require("cors");

const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
