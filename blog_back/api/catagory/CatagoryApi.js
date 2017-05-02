/**
 * Created by gd on 2017/4/19.
 */


let express = require('express');
let router = express.Router();
let Catagory = require('../../models/Catagory');
let tokenModule = require('../../token/token');
let responseData = {};

router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ''
    };
    next()
});


/*获取分类*/

router.post('/get', (req, res, next) => {
    let page = req.body.page;
    let limit = req.body.limit;
    let all = req.body.all;
    if (all) {//获取全部
        Catagory.find().then((catagory) => {
            responseData.code = 0;
            responseData.message = '获取成功';
            responseData.catagorys = catagory;
            res.json(responseData)
            return
        })
    } else {
        let pages = 0;
        let counts = 0;
        let skip = (page - 1) * limit;

        Catagory.count().then((count) => {
            counts = count;
            pages = Math.ceil(count / limit);
            responseData.count = count;
            responseData.pages = pages;
            Catagory.find().limit(limit).skip(skip).then((catagory) => {
                responseData.catagorys = catagory;
                responseData.code = 0;
                res.json(responseData);
                return
            })
        })
    }

})


/*添加分类*/

router.post('/add', (req, res, next) => {
    let token = req.body.token;
    let tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return
    }
    let name = req.body.name;
    Catagory.findOne({name: name})
        .then((info) => {
            if (info) {
                responseData.code = 1;
                responseData.message = '分类已经存在';
                res.json(responseData);
                return
            } else {
                responseData.code = 0;
                responseData.message = "分类添加成功";
                let catagory = new Catagory({name: name});
                catagory.save().then(() => {
                    res.json(responseData);
                    return
                })

            }
        })
})

/*修改分类*/
router.post('/updata', (req, res, next) => {
    let token = req.body.token;
    let tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return
    }
    let id = req.body.id;
    let name = req.body.name;
    Catagory.findOne({_id: id})
        .then((info) => {
            if (info) {
                if (name == info.name) {//输入名字和原名字相同
                    responseData.code = 0;
                    responseData.message = '修改成功'
                    res.json(responseData);
                    return

                } else {

                    Catagory.findOne({_id: {$ne: id}, name: name})
                        .then((sameCatagory) => {
                            if (sameCatagory) {//存在相同分类
                                responseData.code = 2;
                                responseData.message = '该分类已经存在'
                                res.json(responseData);
                                return;
                            } else {
                                Catagory.update({_id: id}, {name: name}).then(() => {
                                    responseData.code = 0;
                                    responseData.message = '修改成功';
                                    res.json(responseData);
                                    return;
                                })
                            }
                        })

                }

            } else {
                responseData.code = 1;
                responseData.message = '该分类不存在';
                res.json(responseData);
                return
            }
        })
})


/*删除分类*/
router.post('/remove', (req, res, next) => {
    let token = req.body.token;
    let tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return
    }
    let id = req.body.id;
    Catagory.remove({_id: id}).then(() => {
        responseData.code = 0;
        responseData.message = '删除成功'
        res.json(responseData);
        return
    })
})

module.exports = router;