export class ResortFactory {
  constructor(data = {}) {
    this.name = data?.name;
    this.address = data?.address;
    this.url = data?.url;
  }

  get getObject() {
    const newData = {};
    Object.keys(this).forEach((key) => {
      newData[key] = this[key];
    });
    return newData;
  }

  update(key, value) {
    this[key] = value;
    return this;
  }
}
