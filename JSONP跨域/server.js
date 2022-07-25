const express = require('express');

const app = express();



app.get('/data',(resquset,response) => {
    let a = {
        name : '阿森'
    }
    a = JSON.stringify(a)
    response.send(`getData(${a})`)
})

app.listen(8010,() => {
    console.log('JSONP请求已准备')
})