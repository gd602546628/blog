/**
 * Created by gd on 2017/4/19.
 */

let mongoose = require('mongoose');

module.exports = new mongoose.Schema({

    name: String,

    coverImg: String,

    list: {
        type: Array,
        default: []
    }
})