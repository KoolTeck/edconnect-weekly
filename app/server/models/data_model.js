class DataModel {
  constructor() {
    this.data = [];
  }

  getAll() {
    return this.data;
  }

  getById(id) {
    const isFindId = this.data.find((obj) => obj.id === id);
    if (isFindId) {
      return isFindId;
    } else {
      return null;
    }
  }

  save(obj) {
    if (this.validate(obj)) {
      this.data.push(obj);
      return true;
    }
    return false;
  }

  update(obj, id) {
    const findObj = this.data.find((user) => user.id === id);
    if (findObj) {
      for (let key in obj) {
        findObj[key] = obj[key];
      }
      return true;
    } else {
      return false;
    }
  }

  delete(id) {
    const user = this.data.find((obj) => obj.id === id);
    let objIndex = this.data.indexOf(user);
    if (user) {
      this.data.splice(objIndex, 1);
      return true;
    } else {
      return false;
    }
  }
  // this method will be overriden in the sub classes
  validate() {
    return false;
  }
}

module.exports = DataModel;
