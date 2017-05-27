'use strict';

/**
 * Created by gd on 2017/4/17.
 */

var mongoose = require('mongoose');

module.exports = new mongoose.Schema({

    username: String,

    password: String,

    isAdmin: {
        type: Boolean,
        default: false
    }
});