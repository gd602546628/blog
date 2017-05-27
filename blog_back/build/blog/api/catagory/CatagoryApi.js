'use strict';

/**
 * Created by gd on 2017/4/19.
 */

var express = require('express');
var router = express.Router();
var Catagory = require('../../models/Catagory');
var tokenModule = require('../../token/token');
var responseData = {};

router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    };
    next();
});

/*获取分类*/

router.post('/get', function (req, res, next) {
    var page = req.body.page;
    var limit = req.body.limit;
    var all = req.body.all;
    if (all) {
        //获取全部
        Catagory.find().then(function (catagory) {
            responseData.code = 0;
            responseData.message = '获取成功';
            responseData.catagorys = catagory;
            res.json(responseData);
            return;
        });
    } else {
        var pages = 0;
        var counts = 0;
        var skip = (page - 1) * limit;

        Catagory.count().then(function (count) {
            counts = count;
            pages = Math.ceil(count / limit);
            responseData.count = count;
            responseData.pages = pages;
            Catagory.find().limit(limit).skip(skip).then(function (catagory) {
                responseData.catagorys = catagory;
                responseData.code = 0;
                res.json(responseData);
                return;
            });
        });
    }
});

/*添加分类*/

router.post('/add', function (req, res, next) {
    var token = req.body.token;
    var tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return;
    }
    var name = req.body.name;
    Catagory.findOne({ name: name }).then(function (info) {
        if (info) {
            responseData.code = 1;
            responseData.message = '分类已经存在';
            res.json(responseData);
            return;
        } else {
            responseData.code = 0;
            responseData.message = "分类添加成功";
            var catagory = new Catagory({ name: name });
            catagory.save().then(function () {
                res.json(responseData);
                return;
            });
        }
    });
});

/*修改分类*/
router.post('/updata', function (req, res, next) {
    var token = req.body.token;
    var tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return;
    }
    var id = req.body.id;
    var name = req.body.name;
    Catagory.findOne({ _id: id }).then(function (info) {
        if (info) {
            if (name == info.name) {
                //输入名字和原名字相同
                responseData.code = 0;
                responseData.message = '修改成功';
                res.json(responseData);
                return;
            } else {

                Catagory.findOne({ _id: { $ne: id }, name: name }).then(function (sameCatagory) {
                    if (sameCatagory) {
                        //存在相同分类
                        responseData.code = 2;
                        responseData.message = '该分类已经存在';
                        res.json(responseData);
                        return;
                    } else {
                        Catagory.update({ _id: id }, { name: name }).then(function () {
                            responseData.code = 0;
                            responseData.message = '修改成功';
                            res.json(responseData);
                            return;
                        });
                    }
                });
            }
        } else {
            responseData.code = 1;
            responseData.message = '该分类不存在';
            res.json(responseData);
            return;
        }
    });
});

/*删除分类*/
router.post('/remove', function (req, res, next) {
    var token = req.body.token;
    var tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return;
    }
    var id = req.body.id;
    Catagory.remove({ _id: id }).then(function () {
        responseData.code = 0;
        responseData.message = '删除成功';
        res.json(responseData);
        return;
    });
});

module.exports = router;