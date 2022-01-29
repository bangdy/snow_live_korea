export class Resort {
  constructor(data = {}) {
    console.log(data);
    this.name = data?.name;
    this.address = data?.address;
    this.url = data?.url;
  }

  get getData() {
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

const oak_valley = new Resort("오크밸리", "강원 원주시 지정면", "oak_valley");
const vivaldi_park = new Resort("비발디파크", "강원 홍천군 서면", "vivaldi_park");

export const resorts = [oak_valley, vivaldi_park];
