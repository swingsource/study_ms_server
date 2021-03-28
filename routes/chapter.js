const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapter')

/**
 * 获取所有目录列表
 */
router.get('/getChapterList', (req, res, next) => {
    chapterController.getChapterList(req, res, next)
})

/**
 * 添加目录
 */
router.post('/add', (req, res, next) => {
    // 参数不为空的判断
    if (!req.body.teachId) {
        res.json({
            code: -1,
            msg: 'teachId不能为空！',
            data: []
        })
        return
    }
    if (!req.body.parentId) {
        res.json({
            code: -1,
            msg: 'parentId不能为空！',
            data: []
        })
        return
    }
    if (!req.body.name) {
        res.json({
            code: -1,
            msg: '目录名称不能为空！',
            data: []
        })
        return
    }
    if (!req.body.sortIndex) {
        res.json({
            code: -1,
            msg: 'sortIndex不能为空！',
            data: []
        })
        return
    }
    chapterController.addChapter(req, res, next)
})

/**
 * 修改目录
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
    if (!req.body.name) {
        res.json({
            code: -1,
            msg: '目录名为空！',
            data: []
        })
        return
    }
    chapterController.updateChapter(req, res, next)
})

/**
 * 删除目录
 */
router.post('/del', (req, res, next) =>{
    if (!req.body.id) {
        res.json({
            code: -1,
            msg: 'id不能为空！',
            data: []
        })
        return
    }
    chapterController.delChapter(req, res, next)
})

module.exports = router;
