const Generation = require("./index.js");
const GenerationTable = require("./table");

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
        const generation = new Generation();
        GenerationTable.storeGeneration(generation)
            .then(({ generationId }) => {
                this._generation = generation;
                this._generation.generationId = generationId;
                console.log("new generation: ", this._generation);
                this._timer = setTimeout(
                    () => this.buildNewGeneration(),
                    this._generation.expiration.getTime() - Date.now()
                );
            })
            .catch((err) => console.error(err));
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
