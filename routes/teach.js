const express = require('express');
const router = express.Router();
const teachController = require('../controllers/teach')

/**
 * 获取教程及其目录列表
 */
// router.get('/getCompleteTeachList', (req, res, next) => {
//     teachController.getCompleteTeachList(req, res, next)
// })

/**
 * 获取教程列表
 */
router.get('/getTeachList', (req, res, next) => {
    teachController.getAll(req, res, next)
})

/**
 * 添加教程
 */
router.post('/add', (req, res, next) => {
    // 教程名字为空，则不允许添加
    if (!req.body.name) {
        res.json({
            code: -1,
            msg: '教程名不能为空',
            data: []
        })
        return
    }
    teachController.addTeach(req, res, next)
})

/**
 * 修改教程
 */
router.post('/update', (req, res, next) => {
    teachController.updateTeach(req, res, next)
})

/**
 * 删除教程
 */
router.post('/del', (req, res, next) => {
    teachController.delTeach(req, res, next)
})

module.exports = router;
