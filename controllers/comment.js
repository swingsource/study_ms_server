const Comment = require('../models/comment')

const CommentController = {
    /**
     * 获取评论列表
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    getAll: async (req, res, next) => {
        try {
            // 构造参数
            let { teachId = '', creator = '' } = req.query
            const params = {
                teachId,
                creator
            }
            const commentList = await Comment.getAll(params)
            res.json({
                code: 200,
                data: commentList,
                msg: '获取评论列表成功'
            })
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 添加评论
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    add: async (req, res, next) => {
        try {
            // 构造参数
            let defaultTime = new Date().getTime()
            let { teachId, creator = '', createTime = defaultTime, comment } = req.body
            const params = {
                teachId,
                creator,
                createTime,
                comment
            }
            let commentId = await Comment.add(params)
            if (commentId.length) {
                res.json({
                    code: 200,
                    data: {
                        commentId: commentId[0]
                    },
                    msg: '添加评论成功'
                })
            } else {
                res.json({
                    code: -1,
                    data: [],
                    msg: '添加评论失败'
                })
            }

        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    }
}

module.exports = CommentController
