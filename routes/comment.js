const express = require('express')
const router = express.Router()

const CommentController = require('../controllers/comment')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/**
 * 获取评论列表
 */
router.get('/getCommentList', (req, res, next) => {
    CommentController.getAll(req, res, next)
})

/**
 * 添加评论
 * @type {Router}
 */
router.post('/add', (req, res, next) => {
    if (!req.body.teachId) {
        res.json({
            code: -1,
            msg: 'teachId不能为空！',
            data: []
        })
        return
    }
    if (!req.body.comment) {
        res.json({
            code: -1,
            msg: '评论内容不能为空！',
            data: []
        })
        return
    }
    CommentController.add(req, res, next)
})

/**
 * 删除评论
 */
router.post('/del', (req, res, next) => {
    if (!req.body.id) {
        res.json({
            code: -1,
            msg: 'id不能为空！',
            data: []
        })
        return
    }
    CommentController.del(req, res, next)
})

module.exports = router;
