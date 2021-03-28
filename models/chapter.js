const knex = require('./knex')
const Base = require('./base')

class Chapter extends Base {
    constructor(prop = 'chapter') {
        super(prop);
    }

    /**
     * 判断是否重复
     * @param params
     * @returns {Knex.QueryBuilder<TRecord, TResult>}
     */
    findByChapterName(params) {
        return knex('chapter')
            .where(
            {
                teachId: params.teachId,
                parentId: params.parentId,
                name: params.name,
            })
            .select()
    }
}

module.exports = new Chapter()
