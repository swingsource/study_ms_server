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
    }
}

module.exports = BookController
