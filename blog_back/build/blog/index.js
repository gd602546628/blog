'use strict';

/**
 * Created by gd on 2017/5/27/027.
 */

var express = require('express');

var app = express();

/*登录注册接口模块*/
app.use('/api/user', require('./api/user/userApi'));
/*分类模块*/
app.use('/api/catagory', require('./api/catagory/CatagoryApi'));
/*文章模块*/
app.use('/api/artical', require('./api/artical/articalApi'));
/*音乐模块*/
app.use('/api/music', require('./api/music/musicApi'));
/*demo模块*/
app.use('/api/demo', require('./api/demo/demoApi'));

module.exports = app;