'use strict';

/**
 * Created by gd on 2017/4/27.
 */

var express = require('express');
var router = express.Router();
var responseData = {};
var tokenModule = require('../../token/token');
var Demo = require('../../models/Demo');

//删除文件夹
var deleteFolderRecursive = function deleteFolderRecursive(path) {

    var files = [];

    if (fs.existsSync(path)) {

        files = fs.readdirSync(path);

        files.forEach(function (file, index) {

            var curPath = path + "/" + file;

            if (fs.statSync(curPath).isDirectory()) {
                // recurse

                deleteFolderRecursive(curPath);
            } else {
                // delete file

                fs.unlinkSync(curPath);
            }
        });

        fs.rmdirSync(path);
    }
};

router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    };
    next();
});

var multiparty = require('multiparty');

var fs = require('fs');
var unzip = require('unzip');

/* 上传*/
router.post('/upload', function (req, res, next) {

    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({ uploadDir: './public/demoTemp/' });
    //上传完成后处理

    form.parse(req, function (err, fields, files) {

        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
        } else {

            var host = fields.host[0] || '';
            var entryName = fields.entryName[0] || '';
            var demoName = fields.demoName[0] || '';

            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var originamlFilename = inputFile.originalFilename;

            //字段验证
            if (host == '' || entryName == "" || demoName == "") {
                fs.unlink(uploadedPath, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                responseData.code = 1;
                responseData.message = '主机名或入口名或Demo名为空';
                res.json(responseData);
                return;
            }

            //文件类型校验，仅支持zip格式
            var zipTest = /(\.zip)$/;
            if (!zipTest.test(originamlFilename)) {
                responseData.code = 1;
                responseData.message = '仅支持ZIP格式';
                res.json(responseData);
                fs.unlink(uploadedPath, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                return;
            }
            var dstPath = './public/demoTemp/' + originamlFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    //重命名完成后将文件解压
                    fs.createReadStream('./public/demoTemp/' + originamlFilename).pipe(unzip.Extract({ path: './public/demo' }));
                    //删除临时文件
                    var dirName = originamlFilename.replace('.zip', '');
                    var dirPath = host + '/public/demo/' + dirName;
                    var entryPath = dirPath + '/' + entryName + '.html';

                    new Demo({
                        dirPath: dirPath,
                        entryPath: entryPath,
                        demoName: demoName
                    }).save().then(function () {
                        responseData.code = 0;
                        responseData.message = '添加成功';
                        res.json(responseData);
                    });
                    fs.unlink(dstPath, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        }
    });
});

/*分页获取Demo*/
router.post('/get', function (req, res, next) {

    var limit = req.body.limit || '';
    var page = req.body.page || '';
    var counts = 0;
    var skip = (page - 1) * limit;
    var pages = 0;
    var all = req.body.all;
    if (all) {
        Demo.find().then(function (demos) {
            responseData.code = 0;
            responseData.message = '获取成功';
            responseData.demos = demos;
            res.json(responseData);
            return;
        });
    } else {

        if (limit == '' || page == '') {
            responseData.code = 1;
            responseData.message = 'limit或page字段为空';
            res.json(responseData);
            return;
        }

        Demo.count().then(function (count) {
            counts = count;
            pages = Math.ceil(counts / limit);
            Demo.find().limit(limit).skip(skip).then(function (demos) {
                responseData.code = 0;
                responseData.message = '查询成功';
                responseData.demos = demos;
                responseData.count = counts;
                res.json(responseData);
                return;
            });
        });
    }
});

//删除demo

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

    Demo.findById(id).then(function (demo) {

        if (demo) {

            Demo.remove({ _id: id }).then(function () {
                responseData.code = 0;
                responseData.message = '删除成功';
                res.json(responseData);
                return;
            });
        } else {
            responseData.code = 1;
            responseData.message = 'demo不存在';
            res.json(responseData);
            return;
        }
    });
});

//根据ID获取Demo
router.post('/getById', function (req, res, next) {
    var id = req.body.id;

    if (id) {
        Demo.findById(id).then(function (demo) {
            responseData.code = 0;
            responseData.message = '获取成功';
            responseData.demo = demo;
            res.json(responseData);
            return;
        });
    } else {
        responseData.code = 1;
        responseData.message = 'id为空';
        res.json(responseData);
        return;
    }
});

module.exports = router;