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
    }
}

module.exports = ContentController
