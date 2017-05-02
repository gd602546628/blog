/**
 * Created by gd on 2017/4/20.
 */

let mongoose = require('mongoose');
let articalSchema = require('../schemas/artical');

module.exports = mongoose.model('Artical', articalSchema);
