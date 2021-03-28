const express = require('express');
const router = express.Router();

const ContentController = require('../controllers/content')

/**
 * 获取教程内容
 */
router.get('/getContent', (req, res, next) => {
    if (!req.query.teachId) {
        res.json({
            code: -1,
            msg: 'teachId不能为空！',
            data: []
        })
        return
    }
    if (!req.query.chapterId) {
        res.json({
            code: -1,
            msg: 'chapterId不能为空！',
            data: []
        })
        return
    }
    ContentController.getContent(req, res, next)
})

/**
 * 添加教程内容
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
    if (!req.body.chapterId) {
        res.json({
            code: -1,
            msg: 'chapterId不能为空！',
            data: []
        })
        return
    }
    ContentController.addContent(req, res, next)
})

/**
 * 修改教程内容
 */
router.post('/update', (req, res, next) => {
    if (!req.body.id) {
        res.json({
            code: -1,
            msg: 'id不能为空！',
            data: []
        })
        return
    }
    ContentController.updateContent(req, res, next)
})

module.exports = router;
