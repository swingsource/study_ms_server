const Book = require('../models/book')

const BookController = {
    /**
     * 获取所有书籍
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    getAll: async (req, res, next) => {
        try {
            // 设置默认的参数
            let { title = '', author = '' } = req.query
            const params = {
                title,
                author
            }
            const bookList = await Book.getAll(params)
            res.json({
                code: 200,
                msg: "获取书籍列表成功",
                data: bookList
            })
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    addBook: async (req, res, next) => {
        try {
            // 设置默认的参数
            let defaultTime = new Date().getTime()
            // 构造参数
            let { title = '', author = '', features = '', detail = '', createTime = defaultTime,  authorIntroduce = '', chapter = '', buySelect = '', btn = ''} = req.body
            const params = {
                title,
                author,
                features,
                detail,
                authorIntroduce,
                chapter,
                buySelect,
                createTime,
                btn
            }
            // 判断书籍是否已经存在
            let isRepeat = await Book.findOne(params)
            if (isRepeat.length) {
                res.json({
                    code: -1,
                    msg: "书籍已经存在，不能继续添加！",
                    data: isRepeat
                })
            } else {
                let bookId = await Book.add(params)
                if (bookId.length) {
                    res.json({
                        code: 200,
                        msg: "添加书籍成功",
                        data: bookId
                    })
                } else {
                    res.json({
                        code: -1,
                        msg: "添加书籍失败",
                        data: []
                    })
                }
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 根据id修改书籍
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    updateBook: async (req, res, next) => {
        try {
            // 构造参数
            let { id, title = '', author = '', features = '', detail = '', authorIntroduce = '', chapter = '', buySelect = '', btn = '', coverUrl = ''} = req.body
            const params = {
                id,
                title,
                author,
                features,
                detail,
                authorIntroduce,
                chapter,
                buySelect,
                btn,
                coverUrl
            }
            let num = await Book.update(params)
            if (num) {
                res.json({
                    code: 200,
                    msg: "修改书籍成功",
                    data: num
                })
            } else {
                res.json({
                    code: -1,
                    msg: "修改书籍失败",
                    data: []
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 根据id删除书籍
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    delBook: async (req, res, next) => {
        try {
            let id = req.body.id
            let num = await Book.del({ id })
            if (num) {
                res.json({
                    code: 200,
                    msg: '删除书籍成功',
                    data: num
                })
            } else {
                res.json({
                    code: -1,
                    msg: '删除书籍失败',
                    data: []
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    }
}

module.exports = BookController
