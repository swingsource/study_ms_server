const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

/**
 * 登录
 */
router.post('/login', (req, res, next) => {
  // 判断userType，如果为空，则不允许登录
  if (!req.body.userType) {
    res.json({
      code: -1,
      msg: '用户类别不能为空！',
      data: ''
    })
    return
  }
  // 如果用户名或密码为空，则不允许登录
  if (!req.body.username || !req.body.password) {
    res.json({
      code: -1,
      msg: '用户名或密码不能为空！',
      data: ''
    })
    return
  }
  userController.login(req, res, next)
})

/**
 * 新增用户 注册用户
 */
router.post('/add', (req, res, next) => {
  // 如果用户名或密码为空，则不允许添加
  if (!req.body.username || !req.body.password) {
    res.json({
      code: -1,
      msg: '用户名或密码不能为空！',
      data: ''
    })
    return
  }
  userController.addUser(req, res, next)
})

module.exports = router;
