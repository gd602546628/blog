'use strict';

/**
 * Created by gd on 2017/4/20.
 */

var express = require('express');
var router = express.Router();
var Artical = require('../../models/Artical');
var responseData = {};
var tokenModule = require('../../token/token');
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    };
    next();
});

/*添加文章*/
router.post('/add', function (req, res, next) {
    var title = req.body.title;
    var catagory = req.body.catagory;
    var discription = req.body.discription || "";
    var content = req.body.content;

    var token = req.body.token;
    var tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return;
    }

    if (catagory == undefined) {
        responseData.code = 4;
        responseData.message = 'catagory字段不能为空';
        res.json(responseData);
        return;
    } else if (title == undefined) {
        responseData.code = 4;
        responseData.message = 'tittle字段不能为空';
        res.json(responseData);
        return;
    }

    if (title == '' || catagory == '' || content == '') {
        responseData.code = 1;
        responseData.message = '标题、分类或内容不能为空';
        res.json(responseData);
        return;
    } else {
        Artical.findOne({ title: title, catagory: catagory }).then(function (data) {
            if (data) {
                responseData.code = 2;
                responseData.message = '已经存在同名同分类的文章';
                res.json(responseData);
                return;
            } else {
                var artical = new Artical({
                    title: title,
                    catagory: catagory,
                    discription: discription,
                    content: content
                });

                artical.save().then(function (info) {
                    responseData.code = 0;
                    responseData.message = '保存成功';
                    res.json(responseData);
                    return;
                }).catch(function (err) {
                    responseData.code = 3;
                    responseData.message = '数据库查询出错';
                    res.json(responseData);
                    return;
                });
            }
        }).catch(function (err) {
            responseData.code = 3;
            responseData.message = '数据库查询出错';
            res.json(responseData);
            return;
        });
    }
});

/*获取文章*/
router.post('/get', function (req, res, next) {

    var page = req.body.page;
    var limit = req.body.limit;
    var pages = 0;
    var skip = (page - 1) * limit;
    var counts = 0;

    var id = req.body.id;
    if (id) {
        Artical.findById(id).populate(['catagory']).then(function (info) {
            if (info) {
                responseData.code = 0;
                responseData.message = '获取成功';
                responseData.artical = info;
                res.json(responseData);
                return;
            }
        });
    } else {
        Artical.count().then(function (count) {
            pages = count / limit;
            counts = count;
            Artical.find().sort({ _id: -1 }).limit(limit).skip(skip).populate(['catagory']).then(function (articals) {
                responseData.code = 0;
                responseData.message = '获取成功';
                responseData.count = counts;
                responseData.pages = pages;
                responseData.articals = articals;
                res.json(responseData);
                return;
            });
        });
    }
});

/*编辑文章*/

router.post('/editor', function (req, res, next) {

    var title = req.body.title;
    var catagory = req.body.catagory;
    var discription = req.body.discription || "";
    var content = req.body.content;
    var id = req.body.id;
    var token = req.body.token;
    var tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return;
    }
    if (catagory == undefined) {
        responseData.code = 4;
        responseData.message = 'catagory字段不能为空';
        res.json(responseData);
        return;
    } else if (title == undefined) {
        responseData.code = 4;
        responseData.message = 'tittle字段不能为空';
        res.json(responseData);
        return;
    }

    if (title == '' || catagory == '' || content == '') {
        responseData.code = 1;
        responseData.message = '标题、分类或内容不能为空';
        res.json(responseData);
        return;
    } else {

        Artical.findById(id).then(function (artical) {
            if (artical) {

                Artical.findOne({ _id: { $ne: id }, catagory: catagory, title: title }).then(function (sameArtical) {
                    if (sameArtical) {
                        responseData.code = 1;
                        responseData.message = '已近存在同名同分类的文章';
                        res.json(responseData);
                        return;
                    } else {
                        Artical.update({ _id: id }, {
                            title: title,
                            catagory: catagory,
                            content: content,
                            discription: discription
                        }).then(function () {
                            responseData.code = 0;
                            responseData.message = '修改成功';
                            res.json(responseData);
                            return;
                        });
                    }
                });
            } else {
                responseData.code = 1;
                responseData.message = '编辑的文章不存在';
                res.json(responseData);
                return;
            }
        });
    }
});

/*根据分类获取文章*/
router.post('/getByCatagory', function (req, res, next) {
    var catagoryId = req.body.catagoryId;
    var page = req.body.page;
    var limit = req.body.limit;
    var pages = 0;
    var skip = (page - 1) * limit;
    var counts = 0;
    if (catagoryId) {
        Artical.count({ catagoryId: catagoryId }).then(function (count) {
            counts = count;
            pages = Math.ceil(counts / limit);
            Artical.find({ catagory: catagoryId }).sort({ _id: -1 }).limit(limit).skip(skip).populate(['catagory']).then(function (articals) {
                responseData.code = 0;
                responseData.message = '获取成功';
                responseData.articals = articals;
                responseData.count = counts;
                responseData.pages = pages;
                res.json(responseData);
                return;
            });
        });
    } else {
        res.code = 0;
        res.message = '分类Id字段不能为空';
    }
});

/*文章阅读数统计*/

router.post('/viewsAdd', function (req, res, next) {
    var id = req.body.id;
    Artical.findById(id).then(function (artical) {
        if (artical) {
            artical.views++;
            artical.save().then(function () {
                responseData.code = 0;
                responseData.message = '添加成功';
                res.json(responseData);
                return;
            });
        } else {
            responseData.code = 1;
            responseData.message = '文章不存在';
            res.json(responseData);
            return;
        }
    });
});

router.post('/delete', function (req, res, next) {
    var token = req.body.token;
    var tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return;
    }

    var id = req.body.id;

    Artical.remove({ _id: id }).then(function () {
        responseData.code = 0;
        responseData.message = '删除成功';
        res.json(responseData);
        return;
    });
});

module.exports = router;