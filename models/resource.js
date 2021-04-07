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
        return knex('resource')
            .where('title', 'like', `%${params.title}%`)
            .andWhere('recommender', 'like', `%${params.recommender}%`)
            .andWhere('approval', 'like', `%${params.approval}%`)
            .andWhere('freeze', '=', 'un')
            .select()
    }

    // 审批
    approve (params) {
        return knex('resource').where({ id: params.id }).update({ approval: params.approval })
    }
}

module.exports = new Resource()
