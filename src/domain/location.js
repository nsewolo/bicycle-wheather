export class Location {
  constructor({city, country, latitude, longitude}) {
    this.city = city;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
  }

  get longitude() {
    return this.longitude;
  }

  get country() {
    return this.country;
  }

  get city() {
    return this.city;
  }
}
