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
      Object.assign(findObj, obj);
      return true;
    } else {
      return false;
    }
  }

  delete(id) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        this.data.splice(i, 1);
        return true;
      }
    }
  }
  // this method will be overriden in the sub classes
  validate() {
    return false;
  }
}

module.exports = DataModel;
