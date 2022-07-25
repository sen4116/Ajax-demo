//引用express模块
const express = require('express');
//实例化对象
const app = express();
//get规划路由
app.get('/server',(resquset,response)=>{
    //设置响应头，允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    //设置响应体
    response.send('hello Ajax')
})
//post规划路由  
// app.post('/server',(resquset,response)=>{
//     // console.log(response)
//     response.setHeader('Access-Control-Allow-Header','*')
//     //设置响应头，允许跨域
//     response.setHeader('Access-Control-Allow-Origin','*')
//     //设置响应体
//     response.send('hello Ajax post')
// })
//接受所有请求 如果设置自定义请求头需要在all事件接收
app.all('/server',(resquset,response)=>{
    // console.log(response)
    //设置允许自定义请求头
    // response.setHeader('Access-Control-Allow-Headers','*')
    //设置响应头，允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    //设置响应体
    response.send('hello Ajax all')
})
//监听服务启动
app.listen(8001,()=>{
    console.log('post请求准备完毕')
})

//回顾点：每个请求方法的不同，要规划不同请求方试的路由