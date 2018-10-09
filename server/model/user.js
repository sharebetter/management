var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    'user': {type: String, require: true},
    'pwd': {type: String, require: true},
    'myArticle':{
        type:mongoose.Schema.Types.ObjectId,
		ref:'Article'
    },
    // 头像 个人简介 职位名称
    'myCollection': {type: String},
    'avator': {type: String},
    'aboutMe': {type: String},
});

module.exports = mongoose.model("User",userSchema);