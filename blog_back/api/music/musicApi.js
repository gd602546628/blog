/**
 * Created by gd on 2017/4/24.
 */


let express = require('express');
let http = require('http');
let router = express.Router();
let responseData = {};
let tokenModule = require('../../token/token')
let MusicList = require('../../models/MusicList');
let groupList = require('./util/createRequest');
router.use((req, res, next) => {
    responseData = {
        code: 0,
        message: ''
    }
    next();
})

/*增加歌单*/
router.post('/add', (req, res, next) => {

    let token = req.body.token;
    let tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return
    }
    let id = req.body.id;
    if (!!!id) {
        responseData.code = 1;
        responseData.message = 'id不能为空';
        res.json(responseData);
        return
    }
    /* let data = ''
     let options = {
     hostname: 'music.163.com',
     path: '/api/playlist/detail?id=' + id,
     headers: {
     'Content-Type': 'application/json'
     },
     method: 'GET'
     }
     let musicReq = http.request(options, (ress) => {
     ress.setEncoding('utf-8')
     ress.on('data', (chunk) => {
     data += chunk

     });
     ress.on('end', () => {
     data = JSON.parse(data)
     if (data.code != '200') {
     responseData.code = 1;
     responseData.message = '歌单不存在';
     res.json(responseData);
     return
     }
     data = data.result;

     let name = data.name;
     let coverImg = data.coverImgUrl;
     let list = [];

     data.tracks.forEach((item, index, arr) => {
     let musicItem = {
     title: '',
     author: '',
     url: '',
     pic: ''
     };
     musicItem.title = item.name;
     musicItem.author = item.artists[0].name;
     musicItem.pic = item.artists[0].img1v1Url;
     musicItem.url = item.mp3Url;
     list.push(musicItem);
     });

     let musicList = new MusicList({
     name: name,
     coverImg: coverImg,
     list: list
     }).save(() => {
     responseData.code = 0;
     responseData.message = '新增成功'
     res.json(responseData);
     return
     })

     })
     })

     musicReq.on('error', (err) => {
     console.log(err)
     return
     })

     musicReq.end()
     */


    groupList(id).then(data => {
        new MusicList(data).save().then(data => {
            responseData.message = '添加成功';
            responseData.code = 0;
            res.json(responseData);
        }).catch(err => {
            responseData.message = '数据库查询出错';
            responseData.code = 1;
            res.json(responseData);
        })
    }).catch(err => {
        responseData.code = 1;
        responseData.message = '调用网易接口出错';
        res.json(responseData)
    })
});

/*获取歌单*/

router.post('/get', (req, res, next) => {

    let limit = req.body.limit;
    let page = req.body.page;
    let counts = 0;
    let pages = 0;
    let skip = (page - 1) * limit;

    let all = req.body.all;

    if (all) {
        MusicList.find().then((data) => {
            responseData.code = 0;
            responseData.message = '获取成功';
            responseData.data = data;
            res.json(responseData);
            return;
        })
    } else {
        MusicList.count().then((count) => {
            counts = count;
            pages = Math.ceil(count / limit);

            MusicList.find().limit(limit).skip(skip).then((data) => {
                if (data) {
                    responseData.code = 0;
                    responseData.message = '获取成功';
                    responseData.data = data;
                    responseData.count = counts;
                    responseData.pages = pages;
                    res.json(responseData);
                    return
                } else {
                    responseData.code = 1;
                    responseData.message = '没有数据'
                    res.json(responseData);
                    return
                }
            })

        })

    }


});

/*删除歌单*/

router.post('/remove', (req, res, next) => {

    let id = req.body.id;

    let token = req.body.token;
    let tokenResult = tokenModule.check(token);
    if (!tokenResult.success) {
        responseData.code = 1;
        responseData.message = tokenResult.message;
        res.json(responseData);
        return
    }
    MusicList.remove({_id: id}).then(() => {
        res.json(responseData)
        return
    })

})

module.exports = router