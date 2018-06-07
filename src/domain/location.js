export class Location {
    constructor({city, country, latitude, longitude}) {
        this._city = city;
        this._country = country;
        this._longitude = longitude;
    }

    get longitude() {
        return this._longitude;
    }
    get country() {
        return this._country;
    }
    get city() {
        return this._city;
    }
}