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
 * 获取用户列表
 */
router.get('/getUserList', function(req, res, next) {
  userController.getAll(req, res, next)
});

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

// 修改用户
router.post('/update', (req, res, next) => {
  if (!req.body.id) {
    res.json({
      code: -1,
      msg: '用户id不能为空！',
      data: ''
    })
    return
  }
  userController.updateUser(req, res, next)
})

// 删除用户（逻辑删除）
router.post('/del', (req, res, next) =>{
  if (!req.body.id) {
    res.json({
      code: -1,
      msg: '用户id不能为空！',
      data: ''
    })
    return
  }
  // admin用户不能删除
  if ((req.body.id - 0) === 1) {
    res.json({
      code: -1,
      msg: 'admin 用户不能删除！',
      data: ''
    })
    return
  }
  userController.delUser(req, res, next)
})

module.exports = router;
