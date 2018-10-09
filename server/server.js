var express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var adminRouter = require('./router/admin')
var mongoose = require('mongoose')
var path = require('path')
const app = express()

//连接MongoDB数据库
mongoose.connect('mongodb://localhost:27017/moment',{useMongoClient:true},(err)=> {
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
    }
})

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/admin', adminRouter)

app.listen(9000, () => {
    console.log('数据库服务已经成功启动，监听的端口号是9000');
})

