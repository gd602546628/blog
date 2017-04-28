/**
 * Created by gd on 2017/4/28.
 */



let mongoose = require('mongoose');

module.exports = new mongoose.Schema({

    demoName: String,

    entryPath:String,

    dirPath:String


})