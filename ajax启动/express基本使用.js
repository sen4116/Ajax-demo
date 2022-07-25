// 1.引用express框架
const express = require('express');
// 2.创建实例对象
const app = express ();
// 3.创建路由规则
app.get('/',(resquset,response)=>{
    //设置响应报文。
    response.send("HELLO AJAX")
});
// 4.监听express启动服务
app.listen(8001,()=>{
    console.log('express 已经启动完毕')
})

//执行中遇到的问题：如没有设置响应报文，访问的过程中就会报错