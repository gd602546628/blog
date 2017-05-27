'use strict';

/**
 * Created by gd on 2017/4/28.
 */

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({

    demoName: String,

    entryPath: String,

    dirPath: String

});