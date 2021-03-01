const DataModel = require("./data_model");

class Project {
  constructor(id, name, abstract, authors, tags, createdBy) {
    this.id = id;
    this.name = name;
    this.abstract = abstract;
    this.authors = authors;
    this.tags = tags;
    this.createdBy = createdBy;
  }
}

class Projects extends DataModel {
  validate(obj) {
    if (
      obj.name !== "" &&
      obj.abstract !== "" &&
      obj.authors !== "" &&
      obj.tags !== "" &&
      obj.createdBy !== "" &&
      Array.isArray(obj.authors) &&
      Array.isArray(obj.tags)
    ) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = {
  Project,
  Projects,
};
