const Chapter = require('../models/chapter')
const utils = require('../util/utils')

const chapterController = {
    /**
     * 获取目录列表
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    getChapterList: async (req, res, next) => {
        try {
            // 构造参数
            let { teachId, parentId } = req.query
            const params = {
                teachId,
                parentId
            }
            const chapterList = await Chapter.getAll(params)
            // list => tree
            const formatChapterList = utils.listToTree(chapterList)
            res.json({
                code: 200,
                msg: "获取教程目录列表成功",
                data: formatChapterList
            })
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    }
}

module.exports = chapterController
