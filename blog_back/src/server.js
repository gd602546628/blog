/**
 * Created by gd on 2017/4/17.
 */

let express = require('express');

let mongoose = require('mongoose');

let bodyParser = require('body-parser');

let path = require('path');

let app = express();

let config = require('./config')

//静态文件托管
//app.use('/public', express.static(__dirname + '../public'));
app.use('/public', express.static(path.resolve('public')));
//bodyparser设置,获取接口入参
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
app.use(bodyParser.json({limit: '5mb'}));

/*跨域处理*/
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//博客应用
app.use('/blog', require('./blog/index'));

//首页重定向
app.get('/', (req, res, next) => {
    res.redirect('../public/blog/index.html')
    res.end()

})

let dbPath = `mongodb://${config.host}/${config.dbName}`
mongoose.connect(dbPath, function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(config.port)
    }
});


