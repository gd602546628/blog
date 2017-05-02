/**
 * Created by gd on 2017/4/17.
 */

let mongoose = require('mongoose');

module.exports = new mongoose.Schema({

    username: String,

    password: String,

    isAdmin: {
        type: Boolean,
        default: false
    }
})