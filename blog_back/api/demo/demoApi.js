/**
 * Created by gd on 2017/4/27.
 */


let express = require('express');
let router = express.Router();
let responseData = {};
let tokenModule = require('../../token/token');
let Demo = require('../../models/Demo');

//删除文件夹
let deleteFolderRecursive = function (path) {

    var files = [];

    if (fs.existsSync(path)) {

        files = fs.readdirSync(path);

        files.forEach(function (file, index) {

            var curPath = path + "/" + file;

            if (fs.statSync(curPath).isDirectory()) { // recurse

                deleteFolderRecursive(curPath);

            } else { // delete file

                fs.unlinkSync(curPath);

            }

        });

        fs.rmdirSync(path);

    }

}

router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ''
    }
    next()
});


let multiparty = require('multiparty');

let fs = require('fs');
let unzip = require('unzip');

/* 上传*/
router.post('/upload', (req, res, next) => {

    //生成multiparty对象，并配置上传目标路径
    let form = new multiparty.Form({uploadDir: './public/demoTemp/'});
    //上传完成后处理

    form.parse(req, (err, fields, files) => {


        let filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
        } else {

            let host = fields.host[0] || '';
            let entryName = fields.entryName[0] || '';
            let demoName = fields.demoName[0] || '';

            let inputFile = files.file[0];
            let uploadedPath = inputFile.path;
            let originamlFilename = inputFile.originalFilename;

            //字段验证
            if (host == '' || entryName == "" || demoName == "") {
                fs.unlink(uploadedPath, (err) => {
                    if (err) {
                        console.log(err)
                    }
                });
                responseData.code = 1;
                responseData.message = '主机名或入口名或Demo名为空';
                res.json(responseData);
                return
            }

            //文件类型校验，仅支持zip格式
            let zipTest = /(\.zip)$/;
            if (!zipTest.test(originamlFilename)) {
                responseData.code = 1;
                responseData.message = '仅支持ZIP格式';
                res.json(responseData);
                fs.unlink(uploadedPath, (err) => {
                    if (err) {
                        console.log(err)
                    }
                });
                return
            }
            let dstPath = './public/demoTemp/' + originamlFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    //重命名完成后将文件解压
                    fs.createReadStream('./public/demoTemp/' + originamlFilename).pipe(unzip.Extract({path: './public/demo'}));
                    //删除临时文件
                    let dirName = originamlFilename.replace('.zip', '');
                    let dirPath = `${host}/public/demo/${dirName}`;
                    let entryPath = `${dirPath}/${entryName}.html`;

                    new Demo({
                        dirPath: dirPath,
                        entryPath: entryPath,
                        demoName: demoName
                    }).save().then(() => {
                        responseData.code = 0;
                        responseData.message = '添加成功';
                        res.json(responseData);

                    })
                    fs.unlink(dstPath, (err) => {
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
router.post('/get', (req, res, next) => {

    let limit = req.body.limit || '';
    let page = req.body.page || '';
    let counts = 0;
    let skip = (page - 1) * limit;
    let pages = 0;
    let all = req.body.all
    if (all) {
        Demo.find().then((demos) => {
            responseData.code = 0;
            responseData.message = '获取成功';
            responseData.demos = demos
            res.json(responseData)
            return
        })
    } else {

        if (limit == '' || page == '') {
            responseData.code = 1;
            responseData.message = 'limit或page字段为空';
            res.json(responseData);
            return;
        }

        Demo.count().then((count) => {
            counts = count;
            pages = Math.ceil(counts / limit);
            Demo.find().limit(limit).skip(skip).then((demos) => {
                responseData.code = 0;
                responseData.message = '查询成功';
                responseData.demos = demos;
                responseData.count = counts;
                res.json(responseData);
                return
            })
        })

    }


})


//删除demo

router.post('/delete', (req, res, next) => {

    let token = req.body.token;
    let tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return
    }

    let id = req.body.id;

    Demo.findById(id).then((demo) => {

        if (demo) {

            Demo.remove({_id: id}).then(() => {
                responseData.code = 0;
                responseData.message = '删除成功';
                res.json(responseData);
                return
            })

        } else {
            responseData.code = 1;
            responseData.message = 'demo不存在';
            res.json(responseData);
            return
        }

    })

})

//根据ID获取Demo
router.post('/getById', (req, res, next) => {
    let id = req.body.id;

    if (id) {
        Demo.findById(id).then((demo) => {
            responseData.code = 0;
            responseData.message = '获取成功';
            responseData.demo = demo
            res.json(responseData);
            return
        })
    } else {
        responseData.code = 1;
        responseData.message = 'id为空'
        res.json(responseData);
        return
    }


})

module.exports = router;