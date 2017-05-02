/**
 * Created by gd on 2017/4/26.
 */


let jwt = require('jsonwebtoken');

let privatKey = 'gdSecret';//秘钥

let expiresIn = 60 * 60 * 24;//过期时间

let getToken = function (content) {
    return jwt.sign(content, privatKey, {
        expiresIn: expiresIn
    })
}

let check = function (token) {
    let obj = {};
    try {
        jwt.verify(token, privatKey);
        obj.success = true;
        obj.message = 'token校验成功'
        return obj
    } catch (e) {
        obj.success = false;
        obj.message = 'token校验失败';
        return obj;
    }


}

module.exports.check = check;
module.exports.getToken = getToken;