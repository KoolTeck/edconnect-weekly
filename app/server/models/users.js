const DataModel = require("./data_model");

class User {
  constructor(
    id,
    firstname,
    lastname,
    email,
    password,
    matricNumber,
    program,
    graduationYear
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.matricNumber = matricNumber;
    this.program = program;
    this.graduationYear = graduationYear;
  }

  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }
}

class Users extends DataModel {
  authenticate(email, password) {
    const findEmail = this.data.find((obj) => obj.email === email);
    const findPassword = this.data.find((obj) => obj.password === password);
    if (findEmail && findPassword) {
      return true;
    } else {
      return false;
    }
  }

  getByEmail(email) {
    const validEmail = this.data.find((obj) => obj.email === email);
    return validEmail ? validEmail : null;
  }

  getByMatricNumber(matricNumber) {
    const validMatricNum = this.data.find(
      (obj) => obj.matricNumber === matricNumber
    );
    return validMatricNum ? validMatricNum : null;
  }

  validate(obj) {
    const validEmail = this.data.find((person) => person.email === obj.email);
    const validMatric = this.data.find(
      (person) => person.matricNumber === obj.matricNumber
    );

    if (
      Object.values(obj) !== null &&
      Object.keys(obj).length !== 0 &&
      !validEmail &&
      !validMatric &&
      obj.password.length >= 7
    ) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = {
  User,
  Users,
};
