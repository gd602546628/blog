'use strict';

/**
 * Created by gd on 2017/4/28.
 */

var mongoose = require('mongoose');
var DemoSchema = require('../schemas/demo');

module.exports = mongoose.model('Demo', DemoSchema);