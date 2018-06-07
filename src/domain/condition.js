export class Condition {
    constructor({date, temperature, text}) {
        this._date = date;
        this._temperature = temperature;
        this._text = text;
    }

    get text() {
        return this._text;
    }
    get temperature() {
        return this._temperature;
    }
    get date() {
        return this._date;
    }
}