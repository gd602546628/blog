'use strict';

/**
 * Created by gd on 2017/4/24.
 */

var express = require('express');
var http = require('http');
var router = express.Router();
var responseData = {};
var tokenModule = require('../../token/token');
var MusicList = require('../../models/MusicList');
var groupList = require('./util/createRequest');
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    };
    next();
});

/*增加歌单*/
router.post('/add', function (req, res, next) {

    var token = req.body.token;
    var tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return;
    }
    var id = req.body.id;
    if (!!!id) {
        responseData.code = 1;
        responseData.message = 'id不能为空';
        res.json(responseData);
        return;
    }

    groupList(id).then(function (data) {
        new MusicList(data).save().then(function (data) {
            responseData.message = '添加成功';
            responseData.code = 0;
            res.json(responseData);
        }).catch(function (err) {
            responseData.message = '数据库查询出错';
            responseData.code = 1;
            res.json(responseData);
        });
    }).catch(function (err) {
        responseData.code = 1;
        responseData.message = '调用网易接口出错';
        res.json(responseData);
    });
});

/*获取歌单*/

router.post('/get', function (req, res, next) {

    var limit = req.body.limit;
    var page = req.body.page;
    var counts = 0;
    var pages = 0;
    var skip = (page - 1) * limit;

    var all = req.body.all;

    if (all) {
        MusicList.find().then(function (data) {
            responseData.code = 0;
            responseData.message = '获取成功';
            responseData.data = data;
            res.json(responseData);
            return;
        });
    } else {
        MusicList.count().then(function (count) {
            counts = count;
            pages = Math.ceil(count / limit);

            MusicList.find().limit(limit).skip(skip).then(function (data) {
                if (data) {
                    responseData.code = 0;
                    responseData.message = '获取成功';
                    responseData.data = data;
                    responseData.count = counts;
                    responseData.pages = pages;
                    res.json(responseData);
                    return;
                } else {
                    responseData.code = 1;
                    responseData.message = '没有数据';
                    res.json(responseData);
                    return;
                }
            });
        });
    }
});

/*删除歌单*/

router.post('/remove', function (req, res, next) {

    var id = req.body.id;

    var token = req.body.token;
    var tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return;
    }
    MusicList.remove({ _id: id }).then(function () {
        res.json(responseData);
        return;
    });
});

module.exports = router;