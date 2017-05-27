/**
 * Created by gd on 2017/4/18.
 */


let express = require('express');
let router = express.Router();
let User = require('../../models/User');
let tokenModule = require('../../token/token');
let responseData = {};

router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ''
    };
    next()
});

/*注册接口
 * @params{
 *  username,
 *  password
 *   repassword
 * }
 * */
router.post('/register', (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let repassword = req.body.repassword;
    if (username == '') {
        responseData.code = 1;
        responseData.message = '用户名不能为空';
        res.json(responseData);
        return
    } else if (password == '') {
        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return
    } else if (password !== repassword) {
        responseData.code = 3;
        responseData.message = '两次输入的密码不一致';
        res.json(responseData);
        return
    } else {
        User.findOne({username: username})
            .then((userInfo) => {
                if (userInfo) {
                    responseData.code = 4;
                    responseData.message = '该用户名已经被注册';
                    res.json(responseData);
                    return
                } else {
                    let user = new User({username: username, password: password});
                    user.save().then(() => {
                        responseData.message = '注册成功';
                        responseData.username = username;
                        res.json(responseData);
                        return;
                    })
                }
            })


    }
})

/*登录接口
 *
 *  @params{
 *  username,
 *  password,
 *
 * }
 * */
router.post('/login', (req, res, next) => {

    let username = req.body.username;
    let password = req.body.password;
    if (username == '' || password == '') {
        responseData.code = 1;
        responseData.message = '密码或用户名不能为空';
        res.json(responseData);
        return
    } else {
        User.findOne({
            password: password,
            username: username
        }).then((userInfo) => {
            if (userInfo) {
                let token = tokenModule.getToken(userInfo);
                responseData.code = 0;
                responseData.message = '登录成功';
                responseData.userInfo = userInfo;
                responseData.token = token;
                res.json(responseData);
                return
            } else {
                responseData.code = 2;
                responseData.message = '用户名或密码错误';
                res.json(responseData);
                return
            }
        }).catch(err => {
            responseData.code = 1;
            responseData.message = err;
            res.json(responseData);
        })
    }

})

/*获取用户列表
 *
 *@params{
 *  page,
 *  limit,
 *
 * }
 * */

router.post('/getUser', (req, res, next) => {
    let page = req.body.page;
    let limit = req.body.limit;
    let pages = 0;
    let skip = (page - 1) * limit
    User.count().then((count) => {
        responseData.pages = Math.ceil(count / limit);
        responseData.count = count
        User.find().limit(limit).skip(skip).then((users) => {
            responseData.users = users;
            responseData.code = 0;
            res.json(responseData);
        })
    })
})
module.exports = router;