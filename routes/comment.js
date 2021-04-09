const express = require('express')
const router = express.Router()

const CommentController = require('../controllers/comment')

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

module.exports = router;
