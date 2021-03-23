const knex = require('./knex')
const Base = require('./base')

class User extends Base {
    // 定义参数默认值为 user 表
    constructor(props = 'user'){
        super(props);
    }

    /**
     * 查询用户是否存在
     * @param params
     * @returns {Knex.QueryBuilder<TRecord, TResult>}
     */
    findOne (params) {
        return knex('user').where({
            userType: params.userType,
            username: params.username,
            password: params.password
        }).select()
    }
}

module.exports = new User()
