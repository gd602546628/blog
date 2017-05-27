'use strict';

/**
 * Created by gd on 2017/4/26.
 */

var jwt = require('jsonwebtoken');

var privatKey = 'gdSecret'; //秘钥

var expiresIn = 60 * 60 * 24; //过期时间

var getToken = function getToken(content) {
    return jwt.sign(content, privatKey, {
        expiresIn: expiresIn
    });
};

var check = function check(token) {
    var obj = {};
    try {
        jwt.verify(token, privatKey);
        obj.success = true;
        obj.message = 'token校验成功';
        return obj;
    } catch (e) {
        obj.success = false;
        obj.message = 'token校验失败';
        return obj;
    }
};

module.exports.check = check;
module.exports.getToken = getToken;