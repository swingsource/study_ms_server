const express = require('express');
const router = express.Router();
const teachController = require('../controllers/teach')

/**
 * 获取教程列表
 */
router.get('/getTeachList', (req, res, next) => {
    teachController.getAll(req, res, next)
})

module.exports = router;
