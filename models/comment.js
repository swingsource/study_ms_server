const Base = require('./base')

class Comment extends Base {
    constructor(prop = 'comment') {
        super(prop);
    }
}

module.exports = new Comment()
