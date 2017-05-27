/**
 * Created by gd on 2017/4/28.
 */



let mongoose = require('mongoose');
let DemoSchema = require('../schemas/demo');

module.exports = mongoose.model('Demo', DemoSchema);
