/**
 * Created by gd on 2017/4/18.
 */

let mongoose = require('mongoose');
let userSchema = require('../schemas/musicList');

module.exports = mongoose.model('MusicList', userSchema);
