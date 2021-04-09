const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapter')

/**
 * 获取所有目录列表
 */
router.get('/getChapterList', (req, res, next) => {
    // 参数不为空的判断
    if (!req.query.teachId) {
        res.json({
            code: -1,
            msg: 'teachId不能为空！',
            data: []
        })
        return
    }
    chapterController.getChapterList(req, res, next)
})

module.exports = router;
