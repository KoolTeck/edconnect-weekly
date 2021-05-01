const express = require("express");

const route = express.Router();
const getProjects = require("../services/project");
const router = require("./user");

route.get("/", (req, res) => {
  const projects = getProjects.getAll();
  const user = req.session.user;
  res.render("Home", { projects, user });
});

route.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = route;
