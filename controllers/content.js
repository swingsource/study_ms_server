const Content = require('../models/content')

const ContentController = {
    /**
     * 获取教程内容
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    getContent: async (req, res, next) => {
        try {
            // 构造参数
            let { teachId = '', chapterId = '' } = req.query
            const params = {
                teachId,
                chapterId
            }
            const contentList = await Content.getAll(params)
            res.json({
                code: 200,
                data: contentList,
                msg: '获取教程内容成功'
            })
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 添加教程内容
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    addContent: async (req, res, next) => {
        try {
            // 构造参数
            let defaultTime = new Date().getTime()
            let { teachId, chapterId, content = '', createTime = defaultTime } = req.body
            const params = {
                teachId,
                chapterId,
                content,
                createTime
            }
            const contentId = await Content.add(params)
            if (contentId.length) {
                res.json({
                    code: 200,
                    msg: '添加教程内容成功',
                    data: contentId
                })
            } else {
                res.json({
                    code: 200,
                    msg: '添加教程内容失败',
                    data: []
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 修改教程内容
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    updateContent: async (req, res, next) => {
        try {
            // 构造参数
            let { id, content = '' } = req.body
            const params = {
                id,
                content
            }
            let num = await Content.update(params)
            if (num) {
                res.json({
                    code: 200,
                    msg: '修改教程内容成功',
                    data: num
                })
            } else {
                res.json({
                    code: 200,
                    msg: '修改教程内容失败',
                    data: []
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    }
}

module.exports = ContentController
