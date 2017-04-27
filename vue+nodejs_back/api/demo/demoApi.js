/**
 * Created by gd on 2017/4/27.
 */


let express = require('express');
let router = express.Router();
let responseData = {}

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


/*上传文件*/


let multiparty = require('multiparty');

let fs = require('fs');
let unzip = require('unzip');

/* 上传*/
router.post('/upload', function (req, res, next) {


    let host = req.body.host;
    let entryName = req.body.entryName;
    let demoName = req.body.demoName;


    //生成multiparty对象，并配置上传目标路径
    let form = new multiparty.Form({uploadDir: './public/demoTemp/'});
    //上传完成后处理

    form.parse(req, (err, fields, files) => {
        let filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
        } else {
            let inputFile = files.file[0];
            let uploadedPath = inputFile.path;
            let originamlFilename = inputFile.originalFilename;
            //文件类型校验，仅支持zip格式
            let zipTest = /(\.zip)$/;
            if (!zipTest.test(originamlFilename)) {
                responseData.code = 1;
                responseData.message = '仅支持ZIP格式';
                res.json(responseData);
                fs.unlink(uploadedPath, (err) => {
                    if(err){
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


module.exports = router;