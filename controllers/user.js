// 引用用户模版数据
const User = require('../models/user.js');

const userController = {
    // showUser 获取用户数据并返回到页面
    showUser: async function(req,res,next){
        try{
            let userData = await User.getAll()
            res.json({
                code: 200,
                msg: "操作成功",
                data: userData
            })
        }catch(e){
            res.json({ code: 0, msg: "操作失败", data: e })
        }
    },
}

module.exports = userController;
