const TRAITS = require('../data/traits.json');

const DEFAULT_PROPERTIES = {
    nickname: 'unnamed',
    get birthday() {
        return new Date();
    },
    get randomTraits() {
        const traits = [];
        TRAITS.forEach(trait => {
            const traitType = trait.type;
            const traitValues = trait.values;
            const traitValue = traitValues[Math.floor(Math.random() * traitValues.length)];
            traits.push({traitType: traitType, traitValue: traitValue});
        });
        return traits;
    }
}


class Dragon {
    constructor({birthday, nickname, traits} = {}) {

        this.birthday = birthday || DEFAULT_PROPERTIES.birthday;
        this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
        this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
    }
}

module.exports = Dragon;