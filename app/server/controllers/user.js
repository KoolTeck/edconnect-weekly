const express = require("express");
const school = require("../services/school");
const user = require("../services/user");
const router = express.Router();
router.get("/signup", (req, res) => {
  const programs = school.getPrograms();
  const graduationYears = school.getGradYears();
  const errors = req.flash("error");
  const data = req.flash("data");
  res.render("Signup", { programs, graduationYears, errors, data });
});

router.post("/signup", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    matricNumber,
    program,
    graduationYear,
  } = req.body;

  const data = {
    firstname: firstName,
    lastname: lastName,
    email: email,
    password: password,
    matricNumber: matricNumber,
    program: program,
    graduationYear: graduationYear,
  };

  const createUser = user.create(data);

  const userCreated = createUser[0];

  if (userCreated) {
    const user = createUser[1];
    req.session.user = user;
    res.redirect("/");
  } else {
    let error = createUser[1];
    error = JSON.stringify(error);
    const formData = JSON.stringify(req.body);
    req.flash("error", error);
    req.flash("data", formData);
    res.redirect("/signup");
  }
});

router.get("/login", (req, res) => {
  const error = req.flash("error");
  const data = req.flash("data");
  res.render("Login", { error, data });
});

router.post("/login", (req, res) => {
  const formData = req.body;
  const validate = user.authenticate(formData.email, formData.password);
  const validUser = validate[0];
  if (validUser) {
    const user = validate[1];
    req.session.user = user;
    res.redirect("/");
  } else {
    let error = validate[1];
    error = JSON.stringify(error);
    const formData = JSON.stringify(req.body);
    req.flash("error", error);
    req.flash("data", formData);
    res.redirect("/login");
  }
});

module.exports = router;
