/**
 * Created by gd on 2017/4/20.
 */


let mongoose = require('mongoose');

module.exports = new mongoose.Schema({

    /*标题*/
    title: String,

    /*描述*/
    discription: {
        type: String,
        default: ""
    },

    /*分类，ObdectID,引用Category*/
    catagory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catagory'
    },

    /*添加时间*/
    addTime: {
        type: Date,
        default: new Date()
    },


    /*阅读量*/
    views: {
        type: Number,
        default: 0
    },

    /*内容*/
    content: String,

    /*评论*/
    comments: {
        type: Array,
        default: []
    }

})