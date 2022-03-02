export const defaultTime = new Date("2022-01-01T00:00:00");

export class ResortFactory {
  constructor(data = {}) {
    this.name = data?.name;
    this.address = data?.address;
    this.url = data?.url;
    this.t1Start = data?.t1Start ?? defaultTime;
    this.t1Finish = data?.t1Finish ?? defaultTime;
    this.t2Start = data?.t2Start ?? defaultTime;
    this.t2Finish = data?.t2Finish ?? defaultTime;
    this.t3Start = data?.t3Start ?? defaultTime;
    this.t3Finish = data?.t3Finish ?? defaultTime;
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
