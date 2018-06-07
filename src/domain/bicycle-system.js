export class BicycleSystem {
    constructor({name, location}) {
        this._name = name;
        this._location = location;
    }

    get name() {
        return this._name;
    }
    get location() {
        return this._location;
    }
}