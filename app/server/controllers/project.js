const express = require("express");
const router = express.Router();
const project = require("../services/project");
const user = require("../services/user");

router.get("/projects/submit", (req, res) => {
  const data = req.flash("data");
  const error = req.flash("error");
  const user = req.session.user;
  if (user) {
    res.render("CreateProject", { data, error, user });
  } else {
    res.redirect("/");
  }
});

router.post("/projects/submit", (req, res) => {
  const { name, abstract, authors, tags } = req.body;
  let createdBy = req.session.user.id;

  let authorsArr = authors.split(",");
  let tagsArr = tags.split(",");
  const data = {
    name: name,
    abstract: abstract,
    authors: authorsArr,
    tags: tagsArr,
    createdBy: createdBy,
  };

  const createNewProject = project.create(data);
  const created = createNewProject[0];
  if (created) {
    res.redirect("/");
  } else {
    let error = createNewProject[1];
    JSON.stringify(error);
    req.flash("error", error);
    req.flash("data", JSON.stringify(req.body));
    res.redirect("/projects/submit");
  }
});

router.get("/project/:id", (req, res) => {
  const id = req.params.id;
  const singleProject = project.getById(id);
  const pCreator = user.getById(singleProject.createdBy);
  console.log(singleProject, pCreator);
  res.render("Project", { singleProject, pCreator });
});

module.exports = router;
