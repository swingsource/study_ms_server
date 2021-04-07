const Resource = require('../models/resource')

const ResourceController = {
    /**
     * 获取推荐资源 - 模糊查询
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    getAll: async (req, res, next) => {
        try {
            // 构造参数
            let { title = '', recommender = '', approval = '' } = req.query
            const params = {
                title,
                recommender,
                approval
            }
            const resourceList = await Resource.getAllDim(params)
            res.json({
                code: 200,
                data: resourceList,
                msg: '获取推荐资源成功'
            })
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 添加资源
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    addResource: async (req, res, next) => {
        try {
            // 构造参数
            let defaultTime = new Date().getTime()
            let { recommender = '游客', createTime = defaultTime, title, url, introduction = '', coverUrl = '' } = req.body
            const params = {
                recommender,
                createTime,
                title,
                url,
                coverUrl,
                introduction
            }
            // 判断资源是否已经存在
            let isRepeat = await Resource.findOne({ url })
            if (isRepeat.length) {
                res.json({
                    code: -1,
                    data: [],
                    msg: '该资源已经存在，不能继续添加'
                })
            } else {
                const resourceId = await Resource.add(params)
                if (resourceId.length) {
                    res.json({
                        code: 200,
                        data: {
                            resourceId: resourceId[0]
                        },
                        msg: '添加资源成功，审核通过后才可展示'
                    })
                } else {
                    res.json({
                        code: -1,
                        data: [],
                        msg: '添加资源失败'
                    })
                }
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 删除推荐资源
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    delResource: async (req, res, next) => {
        try {
            // 构造参数
            let { id } = req.body
            const params = {
                id
            }
            let num = await Resource.del(params)
            if (num) {
                res.json({
                    code: 200,
                    msg: '删除推荐资源成功',
                    data: num
                })
            } else {
                res.json({
                    code: -1,
                    msg: '删除推荐资源失败',
                    data: []
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 审批通过
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    agree: async (req, res, next) => {
        try {
            // 构造参数
            const params = {
                id: req.body.id,
                approval: 'agree'
            }
            let num = await Resource.approve(params)
            if (num) {
                res.json({
                    code: 200,
                    msg: '审批成功',
                    data: num
                })
            } else {
                res.json({
                    code: -1,
                    msg: '审批失败',
                    data: []
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 审批拒绝通过
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    reject: async (req, res, next) => {
        try {
            // 构造参数
            const params = {
                id: req.body.id,
                approval: 'reject'
            }
            let num = await Resource.approve(params)
            if (num) {
                res.json({
                    code: 200,
                    msg: '审批成功',
                    data: num
                })
            } else {
                res.json({
                    code: -1,
                    msg: '审批失败',
                    data: []
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    }
}

module.exports = ResourceController
