const knex = require('../models/knex')

class Base{
    constructor(props){
        this.table = props
    }

    // 查找所有
    getAll (){
        return knex(this.table).where({ freeze: 'un' }).select()
    }

    // 根据id查找
    findById (params) {
        return knex(this.table).where({ id: params.id }).select()
    }

    // 新增
    add (params){
        return knex(this.table).insert(params)
    }

    // 更改
    update (params){
        return knex(this.table).where({ id: params.id } ).update(params)
    }

    // 删除
    del (params){
        return knex(this.table).where({ id: params.id }).update({ freeze: 'had' })
    }

}

module.exports = Base;
