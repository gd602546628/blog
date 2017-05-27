'use strict';

/**
 * Created by gd on 2017/4/19.
 */

var mongoose = require('mongoose');
var userSchema = require('../schemas/catagory');

module.exports = mongoose.model('Catagory', userSchema);