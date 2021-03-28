const knex = require('./knex')
const Base = require('./base')

class Book extends Base {
    constructor(props = 'book') {
        super(props);
    }

    /**
     * 根据作者和书名判断书籍是否重复
     * @param params
     * @returns {Knex.QueryBuilder<TRecord, TResult>}
     */
    findOne (params) {
        return knex('book').where({
            title: params.title,
            author: params.author
        }).select()
    }
}

module.exports = new Book()
