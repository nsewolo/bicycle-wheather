export class BicycleSystem {
  constructor({name, location}) {
    this.name = name;
    this.location = location;
  }

  get name() {
    return this.name;
  }

  get location() {
    return this.location;
  }
}
