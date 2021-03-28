var express = require('express');
var router = express.Router();
const BookController = require('../controllers/book')

/**
 * 获取所有书籍
 */
router.get('/getBookList', (req, res, next) => {
    BookController.getAll(req, res, next)
})

/**
 * 添加书籍
 */
router.post('/add', (req, res, next) => {
    BookController.addBook(req, res, next)
})

/**
 * 修改书籍
 */
router.post('/update', (req, res, next) => {
    // 判断id不为空
    if (!req.body.id) {
        res.json({
            code: -1,
            msg: '书籍id不能为空！',
            data: []
        })
        return
    }
    BookController.updateBook(req, res, next)
})

/**
 * 删除书籍
 */
router.post('/del', (req, res, next) => {
    // 判断id不为空
    if (!req.body.id) {
        res.json({
            code: -1,
            msg: '书籍id不能为空！',
            data: []
        })
        return
    }
    BookController.delBook(req, res, next)
})

module.exports = router;
