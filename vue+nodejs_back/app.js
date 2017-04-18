/**
 * Created by gd on 2017/4/17.
 */

let express = require('express');

let mongoose = require('mongoose');

let bodyParser = require('body-parser');

let app = express();

//静态文件托管
app.use('./public', express.static(__dirname + '/public'));

//bodyparser设置
app.use(bodyParser.urlencoded({extended: true}));


mongoose.connect('mongodb://localhost:27017/blog', function(err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(8888)
    }
});