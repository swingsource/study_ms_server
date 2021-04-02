const express = require('express')
const router = express.Router()

const ResourceController = require('../controllers/resource')

/**
 * 获取推荐资源列表
 */
router.get('/getResourceList', (req, res, next) => {
    ResourceController.getAll(req, res, next)
})

/**
 * 添加推荐资源
 */
router.post('/add', (req, res, next) => {
    if (!req.body.title) {
        res.json({
            code: -1,
            msg: '推荐资源标题不能为空',
            data: []
        })
        return
    }
    if (!req.body.url) {
        res.json({
            code: -1,
            msg: '推荐资源地址不能为空',
            data: []
        })
        return
    }
    ResourceController.addResource(req, res, next)
})

/**
 * 删除推荐资源
 */
router.post('/del', (req, res, next) => {
    if (!req.body.id) {
        res.json({
            code: -1,
            msg: 'id不能为空',
            data: []
        })
        return
    }
    ResourceController.delResource(req, res, next)
})

module.exports = router;
