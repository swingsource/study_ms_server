var express = require('express');
var router = express.Router();
const BookController = require('../controllers/book')

/**
 * 获取所有书籍
 */
router.get('/getBookList', (req, res, next) => {
    BookController.getAll(req, res, next)
})

module.exports = router;
