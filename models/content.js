const Base = require('./base')

class Content extends Base {
    constructor(prop = 'content') {
        super(prop);
    }
}

module.exports = new Content()
