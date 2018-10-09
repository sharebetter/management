var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    'author': {type: String, require: true},
    'userId': {type: String, require: true},
    'time': {type: String,require: true},
    'title':{type: String,require: true},
    // 头像 个人简介 职位名称
    'thumbUp': {type: Number,default:0},
    'mianContent': {type: String},
    'editContent': {type: String,require:true},
});

module.exports = mongoose.model("Article",articleSchema);