'use strict';

/**
 * Created by gd on 2017/4/20.
 */

var mongoose = require('mongoose');
var articalSchema = require('../schemas/artical');

module.exports = mongoose.model('Artical', articalSchema);