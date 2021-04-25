// 引用用户模版数据
const User = require('../models/user.js')
const token = require('../util/jwt')

const userController = {
    /**
     * 登录
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    login: async (req, res, next) => {
        try {
            // 构造参数
            let { userType, username, password } = req.body
            const params = {
                userType,
                username,
                password
            }
            const user = await User.findOne(params)
            if (user.length > 0) {
                // 生成token
                let authorization =  token.encrypt( {data: '/api/user/login' }, 7 * 24 * 60 * 60)
                user[0]['token'] = authorization
                res.json({
                    code: 200,
                    msg: "登录成功",
                    data: user
                })
            } else {
                res.json({
                    code: -1,
                    msg: "用户名或密码错误！",
                    data: user
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 获取用户列表
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    getAll: async function(req,res,next){
        try{
            // 设置默认的参数
            let { userType = '', username = '', password = '', phone = '', email = '', freeze = 'un', gender = '' } = req.query
            let params = {
                userType,
                username,
                password
            }
            let userData = await User.getAll(params)
            res.json({
                code: 200,
                msg: "操作成功",
                data: userData
            })
        }catch(e){
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 注册用户 / 添加用户
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    addUser: async (req, res, next) => {
        try {
            // 设置默认的参数
            let defaultTime = new Date().getTime()
            let { userType = '', username, password, phone = '', email = '', createTime = defaultTime, freeze = 'un', gender = 'male', motto = '', avatar = '' } = req.body
            let params = {
                userType,
                username,
                password,
                createTime
            }
            // 重复的数据不能添加
            let isRepeat = await User.findOne({ userType, username, password })
            if (isRepeat.length) {
                res.json({
                    code: -1,
                    msg: '用户名已存在！',
                    data: []
                })
            } else {
                let user = await User.add(params)
                res.json({
                    code: 200,
                    msg: '添加用户成功',
                    data: user
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 根据id修改用户
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    updateUser: async (req, res, next) => {
        try {
            // 设置默认的参数
            let { id, password = '', phone = '', email = '', freeze = 'un', gender = 'male', motto = '' } = req.body
            let params = {
                id,
                password,
                phone,
                email,
                freeze,
                gender,
                motto
            }
            const num = await User.update(params)
            if (num) {
                res.json({
                    code: 200,
                    msg: '修改用户成功',
                    data: num
                })
            } else {
                res.json({
                    code: -1,
                    msg: '修改用户失败',
                    data: []
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    },

    /**
     * 根据id删除用户
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    delUser: async (req, res, next) => {
        try {
            let id = req.body.id
            let num = await User.del({ id })
            if (num) {
                res.json({
                    code: 200,
                    msg: '删除用户成功',
                    data: num
                })
            } else {
                res.json({
                    code: -1,
                    msg: '删除用户失败',
                    data: []
                })
            }
        } catch (e) {
            res.json({ code: 500, msg: "服务器发生错误", data: e })
        }
    }

}

module.exports = userController;
