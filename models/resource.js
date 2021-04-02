const knex = require('./knex')
const Base = require('./base')

class Resource extends Base {
    constructor(prop = 'resource') {
        super(prop);
    }

    // 根据url判断资源是否重复
    findOne (params) {
        return knex('resource').where({ url: params.url }).select()
    }

    // 模糊查询
    getAllDim (params) {
        if (params.recommender) {
            return knex('resource')
                .where('title', 'like', `%${params.title}%`)
                .andWhere({ recommender: params.recommender })
                .select()
        } else {
            return knex('resource')
                .where('title', 'like', `%${params.title}%`)
                .select()
        }

    }
}

module.exports = new Resource()
