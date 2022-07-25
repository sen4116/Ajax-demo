const express = require('express');

const app = express();

app.get('/home',(resquset,response) => {
    //sendFile: 传输给定的文件path  __dirname：当前文件上一级目录路径
    response.sendFile(__dirname+'/同源策略.html')
})

app.get('/data',(resquset,response) => {
    let a = 1
    a = JSON.stringify(a)
    response.send(a)
})

app.listen(8009,() => {
    console.log('同源策略请求已准备')
})