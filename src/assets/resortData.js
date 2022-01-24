class Resort {
  constructor(name, address, url) {
    this.name = name;
    this.address = address;
    this.url = url;
  }
}

const oak_valley = new Resort("오크밸리", "강원 원주시 지정면", "oak_valley");
const vivaldi_park = new Resort("비발디파크", "강원 홍천군 서면", "vivaldi_park");

export const resorts = [oak_valley, vivaldi_park];
