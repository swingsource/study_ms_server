const jwt = require('jsonwebtoken');
const Token = {
    //  生成
    encrypt: function (data,time){ //data加密数据 ，time过期时间  60 * 30  （30分）
        return jwt.sign(data, 'study_ms_moon', { expiresIn: time })
    },
    // 解析
    decrypt: function(token) {
        try {
            let data = jwt.verify(token, 'study_ms_moon');
            return {
                token: true
            };
        } catch (e) {
            return {
                token: false,
                data: e
            }
        }
    }
}
module.exports = Token
