const { REFRESH_RATE, SECONDS } = require("../config.js");
const refreshRate = REFRESH_RATE * SECONDS;
const Dragon = require("../dragon/index.js");

class Index {
	constructor() {
		this.expiration = this.calculateExpiration();
		this.generationId = undefined;
	}

	calculateExpiration() {
		const expirationPeriod = Math.floor(Math.random() * (refreshRate / 2));
		const msUntilExpiration =
			Math.random() < 0.5
				? refreshRate - expirationPeriod
				: refreshRate + expirationPeriod;
		return new Date(msUntilExpiration + Date.now());
	}

	newDragon() {
		if (Date.now() > this.expiration) {
			throw new Error(`This Generation expired on ${this.expiration}`);
		}
		return new Dragon({ generationId: this.generationId });
	}
}

module.exports = Index;
