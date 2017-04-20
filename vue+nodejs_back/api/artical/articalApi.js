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
    Artical.count().then((count) => {
        pages = count / limit;
        counts = count;
        Artical.find().limit(limit).skip(skip).populate(['catagory']).then((articals) => {
            responseData.code = 0;
            responseData.message = '获取成功';
            responseData.count = counts;
            responseData.pages = pages;
            responseData.articals=articals
            res.json(responseData);
            return
        })
    })

})

module.exports = router;
