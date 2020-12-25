const DEFAULT_PROPERTIES = {
    nickname: 'unnamed',
    get birthday() {
        return new Date();
    }
}
class Dragon {
    constructor({birthday, nickname} = {}) {
        this.birthday = birthday || DEFAULT_PROPERTIES.birthday;
        this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    }
}

module.exports = Dragon;