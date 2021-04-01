const Teach = require('../models/teach')

const teachController = {
    /**
     * 获取教程列表
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    getAll: async (req, res, next) => {
        try {
            // 设置默认的参数
            let { id = '', name = '', author = '', type = '' } = req.query
            const params = {
                id,
                name,
                author,
                type
            }
            const teachList = await Teach.getAll(params)
            res.json({
                code: 200,
                data: teachList,
                msg: '获取教程列表成功'
            })
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 添加教程信息
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    addTeach: async (req, res, next) => {
        try {
            // 设置默认的参数
            let defaultTime = new Date().getTime()
            let { name, author, type, introduction, createTime = defaultTime } = req.body
            const params = {
                name,
                author,
                introduction,
                type,
                createTime
            }
            // 判断是否书名已经存在，已存在则不能添加
            let isRepeat = await Teach.findByTeachName({ name })
            if (isRepeat.length) {
                res.json({
                    code: -1,
                    msg: '教程已存在！',
                    data: []
                })
            } else {
                const teachId = await Teach.add(params)
                if (teachId.length) {
                    res.json({
                        code: 200,
                        msg: "添加教程成功",
                        data: teachId
                    })
                } else {
                    res.json({
                        code: -1,
                        msg: "添加教程失败",
                        data: []
                    })
                }
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 修改教程
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    updateTeach: async (req, res, next) => {
        try {
            // 构造参数
            let { id,  author, introduction, type } = req.body
            const params = {
                id,
                author,
                introduction,
                type
            }
            let num = await Teach.update(params)
            if (num) {
                res.json({
                    code: 200,
                    msg: '修改教程成功',
                    data: num
                })
            } else {
                res.json({
                    code: -1,
                    msg: '修改教程失败',
                    data: []
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 删除教程
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    delTeach: async (req, res, next) => {
        try {
            // 构造参数
            let { id } = req.body
            const params = {
                id
            }
            let num = await Teach.del(params)
            if (num) {
                res.json({
                    code: 200,
                    msg: '删除教程成功',
                    data: num
                })
            } else {
                res.json({
                    code: -1,
                    msg: '删除教程失败',
                    data: []
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    }
}

module.exports = teachController
