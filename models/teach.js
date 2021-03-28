const knex = require('./knex')
const Base = require('./base')

class Teach extends Base {
    // 定义参数默认值为 user 表
    constructor(props = 'teach'){
        super(props);
    }

    /**
     * 根据教程名称判断是否存在
     * @param params
     * @returns {Knex.QueryBuilder<TRecord, TResult>}
     */
    findByTeachName (params) {
        return knex('teach').where({'name': params.name}).select()
    }

    /**
     * 获取教程及其目录信息
     * @returns {Knex.QueryBuilder<any, DeferredKeySelection.ReplaceBase<TResult, any>>}
     */
    getTeachAndChapter () {
        return knex.select('*').from('teach').rightJoin('chapter', 'teach.id', 'chapter.teachId')
    }
}

module.exports = new Teach()
