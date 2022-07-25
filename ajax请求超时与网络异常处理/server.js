//引用express模块
const express = require('express');
//实例化对象
const app = express();
//规划路由
//接受所有请求 如果设置自定义请求头需要在all事件接收
app.get('/server',(resquset,response)=>{
    // console.log(response)
    //设置允许自定义请求头
    // response.setHeader('Access-Control-Allow-Headers','*')
    //设置响应头，允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    //设置响应体
    //设置传送数据 手动数据转json
    let obj = {
        name : 'asen',
        age: '18',
    }
    obj = JSON.stringify(obj)
    //send方法中只能传输 字符串 和 buffer（0,1组成的数据）
    setTimeout(() => {
        response.send('延迟响应');
    },3000)
})
//监听服务启动
app.listen(8003,()=>{
    console.log('请求超时准备完毕')
})