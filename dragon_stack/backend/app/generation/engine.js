const Generation = require("./index.js");

class GenerationEngine {


    constructor() {
        this._generation = null;
        this._timer = null;
    }

    start() {
        this.buildNewGeneration();
    }

    stop() {
        clearTimeout(this._timer);
    }


    buildNewGeneration() {
        this._generation = new Generation();
        console.log('new generation: ', this._generation);
        this._timer = setTimeout(() => this.buildNewGeneration(), this._generation.expiration.getTime() - Date.now());
    }

    get timer() {
        return this._timer;
    }

    set timer(value) {
        this._timer = value;
    }

    get generation() {
        return this._generation;
    }

    set generation(value) {
        this._generation = value;
    }


}

module.exports = GenerationEngine;