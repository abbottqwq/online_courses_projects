const {REFRESH_RATE, SECONDS} = require('../config.js');
const refreshRate = REFRESH_RATE * SECONDS;
const Dragon = require('../dragon.js');

class Index {
    constructor() {
        this._expiration = this.calculateExpiration();
    }

    calculateExpiration() {
        const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));
        const msUntilExpiration = Math.random() < 0.5 ? refreshRate - expirationPeriod : refreshRate + expirationPeriod;
        return new Date(msUntilExpiration + Date.now());
    }

    newDragon() {
        if (Date.now() > this._expiration) {
            throw new Error(`This Generation expired on ${this._expiration}`);
        }
        return new Dragon();
    }

    get expiration() {
        return this._expiration;
    }

    set expiration(value) {
        this._expiration = value;
    }
}

module.exports = Index;