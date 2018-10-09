const express = require('express')
const Router = express.Router()
const Article = require('../model/article')
const User = require('../model/user');
const utils = require('utility')

Router.get('/',(req,res)=>{
    // console.log(req.body);

})
Router.post('/addArticle',(req,res)=>{
    const {title,author,mainContent,time,editContent} = req.body;
    const article = new Article({title,author,mainContent,time,editContent});
    article.save().then((result=>{
        if(result){
            return res.json({status:0,msg:'添加文章成功'})
        }else{
            return res.json({status:1,msg:'添加文章失败'})
        }
    }))
})
Router.get('/userInfo',(req,res)=>{
    User.find().then(result=>{
        if(result){
            res.json({data:result,msg:'success'})
        }
    })
})

module.exports = Router;