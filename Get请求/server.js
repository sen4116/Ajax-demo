//引用express模块
const express = require('express');
//实例化对象
const app = express();
//规划路由
app.get('/server',(resquset,response)=>{
    //设置响应头，允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    //设置响应体
    response.send('hello Ajax')
})
//监听服务启动
app.listen(8000,()=>{
    console.log('get请求准备完毕')
})