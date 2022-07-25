const { response } = require('express');
const express = require('express');
const app = express();
app.all('/check-server',(request,response) => {
    let data = {
        exist : 1,
        msg : "用户名已经存在"
    }
    data = JSON.stringify(data);
    response.send(`judgeName(${data})`)
})
app.listen(8011,()=>{
    console.log("jsonp实践已经启动")
})