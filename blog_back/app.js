/**
 * Created by gd on 2017/4/17.
 */

let express = require('express');

let mongoose = require('mongoose');

let bodyParser = require('body-parser');



let app = express();

//静态文件托管
app.use('/public', express.static(__dirname + '/public'));

//bodyparser设置,获取接口入参
app.use(bodyParser.urlencoded({extended: true,limit:'5mb'}));
app.use(bodyParser.json({limit:'5mb'}));


/*跨域处理*/
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

/*登录注册接口模块*/
app.use('/api/user', require('./api/user/userApi'));
/*分类模块*/
app.use('/api/catagory', require('./api/catagory/CatagoryApi'));
/*文章模块*/
app.use('/api/artical', require('./api/artical/articalApi'));
/*音乐模块*/
app.use('/api/music',require('./api/music/musicApi'));

/*demo模块*/

app.use('/api/demo',require('./api/demo/demoApi'));

mongoose.connect('mongodb://localhost:27017/blog', function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(8888)
    }
});