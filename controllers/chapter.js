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
            let { teachId = '', parentId = '0' } = req.query
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
    },

    /**
     * 添加目录
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    addChapter: async (req, res, next) => {
        try {
            // 构造参数
            let defaultTime = new Date().getTime()
            let { teachId, parentId, name, sortIndex, createTime = defaultTime } = req.body
            const params = {
                teachId,
                parentId,
                name,
                sortIndex,
                createTime
            }
            // 判断是否重复
            let isRepeat = await Chapter.findByChapterName(params)
            if (isRepeat.length) {
                res.json({
                    code: -1,
                    msg: "目录已经存在，不能继续添加！",
                    data: isRepeat
                })
            } else {
                const chapterId = await Chapter.add(params)
                if (chapterId.length) {
                    res.json({
                        code: 200,
                        msg: "添加目录成功",
                        data: chapterId
                    })
                } else {
                    res.json({
                        code: -1,
                        msg: "添加目录失败",
                        data: []
                    })
                }
            }

        } catch {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 修改目录
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    updateChapter: async (req, res, next) => {
        try {
            // 构造参数
            let { id, name } = req.body
            const params = {
                id,
                name
            }
            let chapterId = await Chapter.update(params)
            if (chapterId) {
                res.json({
                    code: 200,
                    msg: '修改目录成功',
                    data: chapterId
                })
            } else {
                res.json({
                    code: -1,
                    msg: '修改目录失败',
                    data: []
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 删除目录
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    delChapter: async (req, res, next) => {
        try {
            // 构造参数
            let { id } = req.body
            const params = {
                id
            }
            let num = await Chapter.del(params)
            if (num) {
                res.json({
                    code: 200,
                    msg: '删除目录成功',
                    data: num
                })
            } else {
                res.json({
                    code: -1,
                    msg: '删除目录失败',
                    data: []
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    }
}

module.exports = chapterController
