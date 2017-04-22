/**
 * Created by gd on 2017/4/20.
 */

let express = require('express');
let router = express.Router();
let Artical = require('../../models/Artical');

let responseData = {};

router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ''
    };
    next()
});


/*添加文章*/
router.post('/add', (req, res, next) => {
    let title = req.body.title;
    let catagory = req.body.catagory;
    let discription = req.body.discription || "";
    let content = req.body.content;


    if (catagory == undefined) {
        responseData.code = 4;
        responseData.message = 'catagory字段不能为空';
        res.json(responseData);
        return
    } else if (title == undefined) {
        responseData.code = 4;
        responseData.message = 'tittle字段不能为空';
        res.json(responseData);
        return
    }


    if (title == '' || catagory == '' || content == '') {
        responseData.code = 1;
        responseData.message = '标题、分类或内容不能为空';
        res.json(responseData);
        return
    } else {
        Artical.findOne({title: title, catagory: catagory})
            .then((data) => {
                if (data) {
                    responseData.code = 2;
                    responseData.message = '已经存在同名同分类的文章'
                    res.json(responseData);
                    return
                } else {
                    let artical = new Artical({
                        title: title,
                        catagory: catagory,
                        discription: discription,
                        content: content
                    });

                    artical.save().then((info) => {
                        responseData.code = 0;
                        responseData.message = '保存成功';
                        res.json(responseData);
                        return
                    }).catch((err) => {
                        responseData.code = 3;
                        responseData.message = '数据库查询出错';
                        res.json(responseData);
                        return
                    })
                }
            }).catch((err) => {
            responseData.code = 3;
            responseData.message = '数据库查询出错';
            res.json(responseData);
            return
        })
    }

});

/*获取文章*/
router.post('/get', (req, res, next) => {

    let page = req.body.page;
    let limit = req.body.limit;
    let pages = 0;
    let skip = (page - 1) * limit;
    let counts = 0;

    let id = req.body.id;
    if (id) {
        Artical.findById(id).populate(['catagory']).then((info) => {
            if (info) {
                responseData.code = 0;
                responseData.message = '获取成功';
                responseData.artical = info;
                res.json(responseData);
                return;
            }
        })
    } else {
        Artical.count().then((count) => {
            pages = count / limit;
            counts = count;
            Artical.find().limit(limit).skip(skip).populate(['catagory']).then((articals) => {
                responseData.code = 0;
                responseData.message = '获取成功';
                responseData.count = counts;
                responseData.pages = pages;
                responseData.articals = articals
                res.json(responseData);
                return
            })
        })
    }


});

/*编辑文章*/

router.post('/editor', (req, res, next) => {

    let title = req.body.title;
    let catagory = req.body.catagory;
    let discription = req.body.discription || "";
    let content = req.body.content;
    let id = req.body.id;

    if (catagory == undefined) {
        responseData.code = 4;
        responseData.message = 'catagory字段不能为空';
        res.json(responseData);
        return
    } else if (title == undefined) {
        responseData.code = 4;
        responseData.message = 'tittle字段不能为空';
        res.json(responseData);
        return
    }

    if (title == '' || catagory == '' || content == '') {
        responseData.code = 1;
        responseData.message = '标题、分类或内容不能为空';
        res.json(responseData);
        return
    } else {

        Artical.findById(id).then((artical) => {
            if (artical) {

                Artical.findOne({_id: {$ne: id}, catagory: catagory, title: title}).then((sameArtical) => {
                    if (sameArtical) {
                        responseData.code = 1;
                        responseData.message = '已近存在同名同分类的文章';
                        res.json(responseData);
                        return
                    } else {
                        Artical.update({_id: id}, {
                            title: title,
                            catagory: catagory,
                            content: content,
                            discription: discription
                        })
                            .then(() => {
                                responseData.code = 0;
                                responseData.message = '修改成功';
                                res.json(responseData);
                                return;
                            })
                    }
                })

            } else {
                responseData.code = 1;
                responseData.message = '编辑的文章不存在';
                res.json(responseData);
                return
            }
        })

    }


});

/*根据分类获取文章*/
router.post('/getByCatagory', (req, res, next) => {
    let catagoryId = req.body.catagoryId;
    let page = req.body.page;
    let limit = req.body.limit;
    let pages = 0;
    let skip = (page - 1) * limit;
    let counts = 0;
    if (catagoryId) {
        Artical.count({catagoryId: catagoryId}).then((count) => {
            counts = count;
            pages = Math.ceil(counts / limit);
            Artical.find({catagory: catagoryId}).limit(limit).skip(skip).then((articals) => {
                responseData.code = 0;
                responseData.message = '获取成功';
                responseData.articals = articals;
                responseData.count = counts;
                responseData.pages = pages;
                res.json(responseData);
                return;
            })
        })

    } else {
        res.code = 0;
        res.message = '分类Id字段不能为空'
    }

})

/*文章阅读数统计*/

router.post('/viewsAdd', (req, res, next) => {
    let id = req.body.id;
    Artical.findById(id).then((artical) => {
        if (artical) {
            artical.views++;
            artical.save().then(() => {
                responseData.code = 0;
                responseData.message = '添加成功';
                res.json(responseData);
                return
            })
        } else {
            responseData.code = 1;
            responseData.message = '文章不存在';
            res.json(responseData);
            return;
        }
    })
})


module.exports = router;
