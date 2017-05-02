/**
 * Created by gd on 2017/4/19.
 */


let mongoose = require('mongoose');
let userSchema = require('../schemas/catagory');

module.exports = mongoose.model('Catagory', userSchema);
