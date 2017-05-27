'use strict';

/**
 * Created by gd on 2017/4/18.
 */

var mongoose = require('mongoose');
var userSchema = require('../schemas/users');

module.exports = mongoose.model('User', userSchema);