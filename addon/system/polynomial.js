import { glog, gexp } from './math';

export default class Polynomial {
  constructor(num, shift) {
    if (num.length == undefined) {
      throw new Error(num.length + '/' + shift);
    }

    let offset = 0;
    while (offset < num.length && num[offset] == 0) {
      offset++;
    }

    this.num = new Array(num.length - offset + shift);

    for (let i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }

  get(index) {
    return this.num[index];
  }

  getLength() {
    return this.num.length;
  }

  multiply(e) {
    let num = new Array(this.getLength() + e.getLength() - 1);

    for (let i = 0; i < this.getLength(); i++) {
      for (let j = 0; j < e.getLength(); j++) {
        num[i + j] ^= gexp(glog(this.get(i)) + glog(e.get(j)));
      }
    }

    return new Polynomial(num, 0);
  }

  mod(e) {
    if (this.getLength() - e.getLength() < 0) {
      return this;
    }

    const ratio = glog(this.get(0)) - glog(e.get(0));
    let num = new Array(this.getLength());

    for (let i = 0; i < this.getLength(); i++) {
      num[i] = this.get(i);
    }

    for (let i = 0; i < e.getLength(); i++) {
      num[i] ^= gexp(glog(e.get(i)) + ratio);
    }

    return new Polynomial(num, 0).mod(e);
  }
}
