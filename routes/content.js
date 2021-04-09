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

module.exports = router;
