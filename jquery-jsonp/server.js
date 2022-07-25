//引用express模块
const express = require('express');
//实例化对象
const app = express();
//规划路由
//接受所有请求 如果设置自定义请求头需要在all事件接收
app.all('/jquery-jsonp',(resquset,response)=>{
    //设置响应体
    //设置传送数据 手动数据转json
    let obj = {
        name : 'asen',
        age: '18',
    }
    obj = JSON.stringify(obj)
    //jquery jsonp中需要接受callback值
    let callback = resquset.query.callback;
    //send方法中只能传输 字符串 和 buffer（0,1组成的数据）
    response.send(`${callback}(${obj})`);
})
//监听服务启动
app.listen(8012,()=>{
    console.log('jquery-jsonp请求准备完毕')
})