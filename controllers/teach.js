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
    }
}

module.exports = teachController
