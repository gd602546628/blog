'use strict';

/**
 * Created by gd on 2017/4/18.
 */

var express = require('express');
var router = express.Router();
var User = require('../../models/User');
var tokenModule = require('../../token/token');
var responseData = {};

router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    };
    next();
});

/*注册接口
 * @params{
 *  username,
 *  password
 *   repassword
 * }
 * */
router.post('/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    if (username == '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return;
    } else if (password == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    } else if (password !== repassword) {
        responseData.code = 3;
        responseData.message = '两次输入的密码不一致';
        res.json(responseData);
        return;
    } else {
        User.findOne({ username: username }).then(function (userInfo) {
            if (userInfo) {
                responseData.code = 4;
                responseData.message = '该用户名已经被注册';
                res.json(responseData);
                return;
            } else {
                var user = new User({ username: username, password: password });
                user.save().then(function () {
                    responseData.message = '注册成功';
                    responseData.username = username;
                    res.json(responseData);
                    return;
                });
            }
        });
    }
});

/*登录接口
 *
 *  @params{
 *  username,
 *  password,
 *
 * }
 * */
router.post('/login', function (req, res, next) {

    var username = req.body.username;
    var password = req.body.password;
    if (username == '' || password == '') {
        responseData.code = 1;
        responseData.message = '密码或用户名不能为空';
        res.json(responseData);
        return;
    } else {
        User.findOne({
            password: password,
            username: username
        }).then(function (userInfo) {
            if (userInfo) {
                var token = tokenModule.getToken(userInfo);
                responseData.code = 0;
                responseData.message = '登录成功';
                responseData.userInfo = userInfo;
                responseData.token = token;
                res.json(responseData);
                return;
            } else {
                responseData.code = 2;
                responseData.message = '用户名或密码错误';
                res.json(responseData);
                return;
            }
        }).catch(function (err) {
            responseData.code = 1;
            responseData.message = err;
            res.json(responseData);
        });
    }
});

/*获取用户列表
 *
 *@params{
 *  page,
 *  limit,
 *
 * }
 * */

router.post('/getUser', function (req, res, next) {
    var page = req.body.page;
    var limit = req.body.limit;
    var pages = 0;
    var skip = (page - 1) * limit;
    User.count().then(function (count) {
        responseData.pages = Math.ceil(count / limit);
        responseData.count = count;
        User.find().limit(limit).skip(skip).then(function (users) {
            responseData.users = users;
            responseData.code = 0;
            res.json(responseData);
        });
    });
});
module.exports = router;