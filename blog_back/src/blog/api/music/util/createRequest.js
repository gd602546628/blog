/**
 * Created by gd on 2017/5/25/025.
 */

let http = require('http');
let Encrypt = require('./crypto.js');

let createRequest = function (path, data, success, fail) {
    let music_req = '';
    let cryptoreq = Encrypt(data);

    let http_client = http.request({
        hostname: 'music.163.com',
        method: 'POST',
        path: path,
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': 'http://music.163.com',
            'Host': 'music.163.com',
            'Cookie': "",
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537.36',
        }
    }, res => {
        res.on('error', err => {
            fail(err)
        });
        res.setEncoding('utf8');
        if (res.statusCode != 200) {
            fail(res.statusCode);
        } else {
            res.on('data', (chunk) => {
                music_req += chunk;
            });
            res.on('end', () => {
                if (music_req == '') {
                    createRequest(path, data, success, fail)
                } else {
                    console.log('success')
                    success(JSON.parse(music_req));
                }
            })
        }
    });
    http_client.write('params=' + cryptoreq.params + '&encSecKey=' + cryptoreq.encSecKey);
    http_client.end();
}


function getList(id) {

    const data = {
        "id": id,
        "offset": 0,
        "total": true,
        "limit": 1000,
        "n": 1000,
        "csrf_token": ""
    };

    return new Promise((resolve, reject) => {
        createRequest('/weapi/v3/playlist/detail', data, function (data) {
            resolve(data);
        }, function (err) {
            reject(err);
        })
    })
}

function getMusic(ids) {

    const data = {
        'ids': ids,
        'br': 999000,
        "csrf_token": ""
    }

    return new Promise((resolve, reject) => {
        createRequest('/weapi/song/enhance/player/url', data, data => {
            resolve(data)
        }, err => {
            reject(err)
        })
    })
}

//数组分段
function formatArr(arr, num) {
    let newArr = [];

    for (let i = 0; i < arr.length; i += num) {
        newArr.push(arr.slice(i, i + num))
    }

    return newArr;
}

//整合获取歌单与获取歌曲两个接口
function groupList(id) {
    let result = {
        name: '',
        coverImg: '',
        list: [],
    };
    let list = [];
    return new Promise((resolve, reject) => {
        getList(id).then((musicListResponse) => {
            let musicList = musicListResponse.playlist;
            result.name = musicList.name;
            result.coverImg = musicList.creator.backgroundUrl;
            let musicIds = musicList.trackIds;
            musicIds = musicIds.map(item => {
                return item.id
            });
            let idGroup = formatArr(musicIds, 10);
            let promiseArr = [];
            let resultArr = [];
            idGroup.forEach(item => {
                promiseArr.push(getMusic(item).then(data => {
                    resultArr = resultArr.concat(data.data);
                }).catch(err => {
                    console.log(err);
                }))
            })

            Promise.all(promiseArr).then(data => {

                resultArr.forEach(item => {
                    let musicItem = {
                        pic: '',
                        url: '',
                        author: '',
                        title: ''
                    };
                    musicList.tracks.forEach(track => {
                        if (item.id == track.id) {
                            musicItem.pic = track.al.picUrl;
                            musicItem.author = track.ar[0].name;
                            musicItem.title = track.name;
                            musicItem.url = item.url;
                            list.push(musicItem);
                        }
                    });
                });

                result.list = list;
                resolve(result);
            }).catch(err => {
                reject('getmusci wrong')
            })


        }).catch(err => {
            reject(err);
        })
    })
}

module.exports=groupList;
