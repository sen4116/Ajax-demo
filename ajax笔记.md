# Ajax笔记 part 1

[掘金地址]([ajax - 啊森的专栏 - 掘金 (juejin.cn)](https://juejin.cn/column/7072006997046116360))

Ajax优点：1.页面不刷新，与服务器进行通信。

​		 2.用户在页面中做操作，从而实现局部数据刷新，数据懒加载功能。

缺点：1.没有浏览记录，不能退回

​	 2.当a域名网站请求b网站资源存在跨域请求问题

​	 3.因为是做局部刷新且异步请求，请求到的数据并不会直接出现在页面上，只会动态创建标签进行赋值，所以可以实现反爬虫（seo）的效果



http协议【超文本传输协议】，协议详细规定了浏览器和万维网服务器之间互相通信的规则



http请求报文： 格式与参数（重点）

行：1.请求类型（get/post等请求方式）2.请求路径（请求地址、是否携带参数）3.请求协议版本 HTTP/1.1

头: Host: atguigu.com

​	Cookie:name=guigu

​	Content-type : application/x-www-from-urlencoded

​	User-Agent: chrome 83

空行

体：get请求类型可以有请求体，也可以没有请求体，post请求类型不为空 



http相应报文 

行： 1.请求协议版本 HTTP/1.1 2.http状态码：200 

头   Content-Type: text/html; charset=utf-8 (charset:字符串)

​	 Conten-length:2048

​	 Conten-encoding:gzip

空行

体	请求后所得的内容

```javascript
	<html>
		<head>
		</head>
		<body>
			<h1>阿森</h1>	
		</body>
	</head>
```



​	</html>	

#### **HTTP状态码**

- ```
  1XX
  ```

  ：信息状态码

  - `100 Continue` 继续，一般在发送`post`请求时，已发送了`http header`之后服务端将返回此信息，表示确认，之后发送具体参数信息

- ```
  2XX
  ```

  ：成功状态码

  - `200 OK` 正常返回信息
  - `201 Created` 请求成功并且服务器创建了新的资源
  - `202 Accepted` 服务器已接受请求，但尚未处理

- ```
  3XX
  ```

  ：重定向

  - `301 Moved Permanently` 请求的网页已永久移动到新位置。
  - `302 Found` 临时性重定向。
  - `303 See Other` 临时性重定向，且总是使用 `GET` 请求新的 `URI`。
  - `304 Not Modified` 自从上次请求后，请求的网页未修改过。

- ```
  4XX
  ```

  ：客户端错误

  - `400 Bad Request` 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
  - `401 Unauthorized` 请求未授权。
  - `403 Forbidden` 禁止访问。
  - `404 Not Found` 找不到如何与 `URI` 相匹配的资源。

- ```
  5XX:
  ```

   

  服务器错误

  - `500 Internal Server Error` 最常见的服务器端错误。
  - `503 Service Unavailable` 服务器端暂时无法处理请求（可能是过载或维护）



浏览器控制台查看报文

在浏览器控制台点击network查看网站当前页面所有请求，

headers：查看报文   1.General，2.Response Headers:响应头，3.Request Headers:请求头(view source:查看未解析过的请求头，view parsed：查看解析过的请求头)，4.Query String Parameters（对url参数进行了参数解析）

preview：对查看相应报文的预览

response ：对请求数据做解析



ajax准备工作

1.安装node.js 	在cmd中查看node版本 node -v（不要下载最新的node，兼容性差）

旧版本安装 https://nodejs.org/zh-cn/download/releases/ 

![image-20220327215536557](C:\Users\1477715879\AppData\Roaming\Typora\typora-user-images\image-20220327215536557.png)

找到旧版本点击下载，下载msi文件就可以.

![image-20220327215715098](C:\Users\1477715879\AppData\Roaming\Typora\typora-user-images\image-20220327215715098.png)

设置npm 环境变量 在用户变量 新建添加 C:\Users\你电脑的用户名\AppData\Roaming\npm

![image-20220327220604431](C:\Users\1477715879\AppData\Roaming\Typora\typora-user-images\image-20220327220604431.png)

2.安装express 	 const express = require('express')  //引用express模块 需要在安装express文件下引用（[查看官网如何安装](https://www.expressjs.com.cn/starter/installing.html)）

3.创建应用对象 const app = express ();

4.创建路由规则  resquest:是对请求报文的封装，response:是对响应报文的封装

app.get('/',(resquest,response)=>{

​	//设置响应

​	response.send('HELLO AJAX')

})

5.监听端口启动服务

app.listen(8000,()=>{

​	console.log('8000端口已经启动完毕')

})

6.启动服务，用node 在书写express.js文件打开终端执行 输入node “文件名”  ，再用浏览器输入本地ip +端口号

查询本地ip 在cmd 中输入**输入ipconfig命令查看ip**

![image-20220327224536727](C:\Users\1477715879\AppData\Roaming\Typora\typora-user-images\image-20220327224536727.png)



# Ajax笔记 part 2	

#### 1.Get请求

准备好的html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <button>发送get请求</button>
    <textarea name="" id="t1" cols="30" rows="10">

    </textarea>
    <script>
        const btn = document.getElementsByTagName('button')[0];
        btn.onclick = function (){
            // 创建请求对象
            const xhr = new XMLHttpRequest();
            //初始化 设置请求方法和请求url
            xhr.open('get','http://192.168.0.102:8000/server');
            //发送
            xhr.send();
            //事件绑定  处理server （服务器）返回结果
            /**
             * on 在...时候
             * ready state 表示xhr 的状态 有 0，1，2，3，4
             * 0 是 xhr未初始化； 1 是调用open方法；2 是 调用send方法
             * 3 是部分服务器返回的结果；4 是服务器返回的全部结果
             * 所以需要在xhr状态为4的时候处理返回的结果最好
             * 
             * change 改变的时候触发
            */
            xhr.onreadystatechange = function(){
                //判断执行了xhr执行状态
                if(xhr.readyState === 4){
                    //判断响应码 2** 都算成功
                    if(xhr.status >= 200 && xhr.status < 300){
                        //处理结果  行 头 空行 体
                        console.log(xhr.status)//状态码
                        console.log(xhr.statusText)//状态字符串
                        console.log(xhr.getAllResponseHeaders()) //所有响应头
                        console.log(xhr.response)//响应体
                        //将响应体赋值给文本域
                        document.getElementById('t1').innerHTML = xhr.response;
                    }
                }
            } 
        } 
    </script>
</body>
<style>
    #t1{
        width: 200px;
        height: 200px;
        border: #68e91e solid 2px;
    }
</style>
</html>
```

准备好 运行的js文件 用npm + 文件名

```js
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
```

#### 2.请求时携带参数

```javascript
// 创建请求对象
const xhr = new XMLHttpRequest();
//初始化 设置请求方法和请求url
// xhr.open('get','http://192.168.0.102:8000/server');
//请求时携带参数
xhr.open('get','http://192.168.0.102:8000/server?a=100&b=200&c=300');
//发送
xhr.send();
```

只有get请求在url携带请求参数

![image-20220329225932656](C:\Users\1477715879\AppData\Roaming\Typora\typora-user-images\image-20220329225932656.png)

#### 3.POST请求

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <textarea name="" id="t1" cols="30" rows="10">

    </textarea>
    <script>
        //获取标签信息
        const text = document.getElementById('t1');
        //给标签绑定事件 鼠标移动到指定物体事件  悬浮事件
        text.addEventListener('mouseover',()=>{
            // console.log("执行了悬浮事件")
            /**创建请求对象，初始化请求类型和ip，
             * 判断事件执行状态，
             * 只有当status >= 200 && status <300 为成功后将请求的response赋值给html
            */
           const xhr = new XMLHttpRequest();
           xhr.open("POST",'http:/192.168.0.102:8001/server');
           xhr.send();
           xhr.onreadystatechange = ()=>{
               if(xhr.readyState == 4){
                if(xhr.status >= 200 && xhr.status < 300){
                    console.log(xhr.response)
                    text.innerHTML = xhr.response;
                }
               }
           }
        })
    </script>
</body>
<style>
    #t1{
        width: 200px;
        height: 200px;
        border: #68e91e solid 2px;
    }
</style>
</html>
```

```javascipt
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
app.post('/server',(resquset,response)=>{
    //设置响应头，允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    //设置响应体
    response.send('hello Ajax post')
})
//监听服务启动
app.listen(8001,()=>{
    console.log('post请求准备完毕')
})

//回顾点：每个请求方法的不同，要规划不同请求方试的路由
```

#### 4.POST请求携带参数的方试

post请求携带参数，是在发送请求的时候携带的

```javascript
const xhr = new XMLHttpRequest();
xhr.open("POST",'http:/192.168.0.102:8001/server');
let params = 'a=300&b=200&c=100'
xhr.send(params);//post请求携带参数，是在发送请求的时候携带的
xhr.onreadystatechange = ()=>{
    if(xhr.readyState == 4){
        if(xhr.status >= 200 && xhr.status < 300){
        console.log(xhr.response)
        text.innerHTML = xhr.response;
        }
    }
}
```

![image-20220329235050406](C:\Users\1477715879\AppData\Roaming\Typora\typora-user-images\image-20220329235050406.png)

#### 5.设置请求头

设置请求头一般传递用户身份识别信息

```javascript
 const xhr = new XMLHttpRequest();
 xhr.open("POST",'http:/192.168.0.102:8001/server');
 //设置请求头信息 使用setRequestHeader 需要在open之后，send之前使用中，其中的参数键值对，第一个为键。第二个为值
 xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
 xhr.setRequestHeader('name','asen')//可以设置自定义请求头，但是需要后台设置允许自定义请求头
 let params = 'a=300&b=200&c=100'
 xhr.send(params);//post请求携带参数，是在发送请求的时候携带的
 xhr.onreadystatechange = ()=>{
     if(xhr.readyState == 4){
         if(xhr.status >= 200 && xhr.status < 300){
             console.log(xhr.response)
             text.innerHTML = xhr.response;
         }
     }
 }
```

```javascript
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
```

#### 6.服务器传递JSON数据

```javascript
 const result = document.getElementById('result')
 //监听键盘按下事件
 window.onkeydown = function(){
     let xhr = new XMLHttpRequest();
     xhr.responseType = "json"
     xhr.open('get','http://192.168.141.51:8002/json-server')
     xhr.send();
     xhr.onreadystatechange = ()=>{
             if(xhr.readyState == 4){
             if(xhr.status >= 200 && xhr.status < 300){
             //手动 将服务器请求的json数据转为数据
             // let obj = JSON.parse(xhr.response)
             // result.innerHTML = obj.name
             //自动转化 只需要xhr.responseTpye = "json"
             console.log(xhr.response)
             result.innerHTML = xhr.response.name
             }
         }
     }
 }
```

```javascript
//引用express模块
const express = require('express');
//实例化对象
const app = express();
//规划路由
//接受所有请求 如果设置自定义请求头需要在all事件接收
app.all('/json-server',(resquset,response)=>{
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
    response.send(obj)
})
//监听服务启动
app.listen(8002,()=>{
    console.log('json请求准备完毕')
})
```

#### 7.安装nodemon监听服务器(server)自动重启

需要监听哪个文件就去哪个文件下面输入nodemon "文件名"

问题：系统禁止运行脚本。

解决方案 

1.输入nodemon.cmd "运行文件夹名字"

2.按下组合键Windows + R以打开运行窗口。输入powershell然后按下回车键。

输入Start-Process powershell -Verb runAs，会打开管理员窗口

在管理员窗口输入set-ExecutionPolicy RemoteSigned 回复输入Y即可

![image-20220406220051426](C:\Users\1477715879\AppData\Roaming\Typora\typora-user-images\image-20220406220051426.png)

# Ajax笔记 part 3

#### 1.请求超时或请求异常处理

timeout	//请求超时回调

onerroe	//请求异常回调

```javascript
const btn = document.getElementsByTagName("button")[0];
const result = document.getElementById("result");
btn.addEventListener("click",() => {
const xhr = new XMLHttpRequest();
//请求时间设置(超时设置)   2s
xhr.timeout = 2000;
//请求超时回调
xhr.ontimeout = () => {
	alert("网络异常，请稍后再试")
}
//请求异常回调
xhr.onerror = () => {
	alert("你的网络连接失败")	
}
xhr.open("get","http://192.168.0.102:8003/server")
    xhr.send();
    xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300){
            	result.innerHTML = xhr.response
            }
        }
    }
}) 
```

```javascript
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
    setTimeout(() => {
        response.send('延迟响应');
    },3000)
})
//监听服务启动
app.listen(8003,()=>{
    console.log('请求超时准备完毕')
})
```



#### 2.手动取消请求

abort	//取消当前请求

```javascript
const btn1 = document.getElementsByTagName("button")[0];
const btn2 = document.getElementsByTagName("button")[1];
const result = document.getElementById("result");
let xhr;
btn1.addEventListener("click",() => {
    xhr = new XMLHttpRequest();
    xhr.open("get","http://192.168.0.102:8004/server")
    xhr.send();
    xhr.onreadystatechange = () => {
    	if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status < 300){
            	result.innerHTML = xhr.response
            }
        }
    }
}) 
btn2.addEventListener("click", () => {
//手动取消请求
	xhr.abort()
})
```

#### 3.重复发送请求(节流)

```javascript
const btn1 = document.getElementsByTagName("button")[0];
const result = document.getElementById("result");
let xhr,
isSending = false; //是否正在发送请求
btn1.addEventListener("click",() => {
    /***
    * 节流执行顺序: 
    * 1. 当第一次点击xhr没有值为undefined，isSending为false
    * 2. 当第二次点击xhr是全局变量没有释放，所以它还是请求方式对象，还是可以使用取消请求方法
    *    而isSending状态因上次请求还没有完成，所以为true,所以执行了xhr.abort方法
    */
	if(isSending) xhr.abort() //当请求状态没有被修改时，则取消上一次请求 
	xhr = new XMLHttpRequest();
	isSending = true;
	xhr.open("get","http://192.168.0.102:8005/server")
	xhr.send();
	xhr.onreadystatechange = () => {
		if(xhr.readyState == 4){
            isSending = false //请求结束后，改变状态，我们不能判断每次请求是否成功，所以不能在放在判断请求是否成功之中。
            if(xhr.status >= 200 && xhr.status < 300){
                result.innerHTML = xhr.response
            }
		}
	}
}) 
```

```javascript
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
        response.send('响应');
    },3000)
})
//监听服务启动
app.listen(8005,()=>{
    console.log('重复请求准备完毕')
})
```

# Ajax笔记part 4

#### 1.jQuery中使用Ajax

##### **GET 和 POST 方法的区别**：

**1、发送的数据数量**

在 GET 中，只能发送有限数量的数据，因为数据是在 URL 中发送的。

在 POST 中，可以发送大量的数据，因为数据是在正文主体中发送的。

**2、安全性**

GET 方法发送的数据不受保护，因为数据在 URL 栏中公开，这增加了漏洞和黑客攻击的风险。

POST 方法发送的数据是安全的，因为数据未在 URL 栏中公开，还可以在其中使用多种编码技术，这使其具有弹性。

**3、加入书签中**

GET 查询的结果可以加入书签中，因为它以 URL 的形式存在；而 POST 查询的结果无法加入书签中。

**4、编码**

在表单中使用 GET 方法时，数据类型中只接受 ASCII 字符。

在表单提交时，POST 方法不绑定表单数据类型，并允许二进制和 ASCII 字符。

**5、可变大小**

GET 方法中的可变大小约为 2000 个字符。

POST 方法最多允许 8 Mb 的可变大小。

**6、缓存**

GET 方法的数据是可缓存的，而 POST 方法的数据是无法缓存的。

**7、主要作用**

GET 方法主要用于获取信息。而 POST 方法主要用于更新数据。

```javascript
<body>
        <button style="background: rgb(219, 130, 13);">
            点击自定义发送请求
        </button>
        <button style="background: rgb(13, 219, 75);">
            点击get方法请求
        </button>
        <button style="background: rgb(10, 25, 236);">
            点击post方法请求
        </button>
        <div id="result">

        </div>
        <script src="../jquery-3.4.1.js"></script>
        <script>
            console.log($.ajax)
            //jquery之ajax自定义请求
            $("button").eq(0).click(() => {
                let data = { a:100,b:200 };
                $.ajax({
                    //设置请求地址
                    url: 'http://192.168.0.102:8006/jquery-server',
                    //设置请求方法
                    type: 'get',
                    //设置请求参数
                    data,
                    //设置响应体结果
                    dataType: 'json',
                    //请求头信息
                    headers: {
                        c: 300,
                        d: 400
                    },
                    //请求成功回调
                    success: (data) => {
                        console.log(data)
                    },
                    //设置响应时间
                    timeout: '2000',
                    //请求失败回调
                    error: ()=>{

                    },
                })  
            })

            //jquery之ajax get请求
            $('button').eq(1).click(() => {
                /**
                *get请求方法有4个参数：
                *1.请求路径，
                *2.请求携带数据，
                *3.规定当请求成功时运行的函数额外的参数：data - 包含来自请求的结果数据,status - 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）,xhr - 包含 XMLHttpRequest 对象
                *4.dataType: 规定预期的服务器响应的数据类型,
                *"xml" - 一个 XML 文档
                *"html" - HTML 作为纯文本
                *"text" - 纯文本字符串
                *"script" - 以 JavaScript 运行响应，并以纯文本返回
                *"json" - 以 JSON 运行响应，并以 JavaScript 对象返回
                *"jsonp" - 使用 JSONP 加载一个 JSON 块，将添加一个 "?callback=?" 到 URL 来规定回调
                **/
                $.get('http://192.168.0.102:8006/jquery-server','',(data,status) =>{
                    console.log("数据: " + data + "\n状态: " + status)
                    console.log(data.name)
                },'json')
            })

            //jquery之ajax post请求
            $('button').eq(2).click(() => {
               /**
                * post请求方法有4个参数
                * 1.请求路径，
                * 2.请求携带数据，
                * 3.规定当请求成功时运行的函数额外的参数：data - 包含来自请求的结果数据,status - 包含请求的状态（"success"、"notmodified"、"error"、"timeout"、"parsererror"）,xhr - 包含 XMLHttpRequest 对象
                * 4.dataType: 规定预期的服务器响应的数据类型,
                * "xml" - 一个 XML 文档
                * "html" - HTML 作为纯文本
                * "text" - 纯文本字符串
                * "script" - 以 JavaScript 运行响应，并以纯文本返回
                * "json" - 以 JSON 运行响应，并以 JavaScript 对象返回
                * "jsonp" - 使用 JSONP 加载一个 JSON 块，将添加一个 "?callback=?" 到 URL 来规定回调
                * */ 
                $.post('http://192.168.0.102:8006/jquery-server',{a: 100,b: 200},(data,status) => {
                    console.log("数据: " + data + "\n状态: " + status)
                    console.log(data.age)
               },'json')
            })
        </script>
    </body>
```

```js
//引用express模块
const express = require('express');
//实例化对象
const app = express();
//规划路由
//接受所有请求 如果设置自定义请求头需要在all事件接收
app.all('/jquery-server',(resquset,response)=>{
    // console.log(response)
    //设置允许自定义请求头
    response.setHeader('Access-Control-Allow-Headers','*')
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
    response.send(obj);
})
//监听服务启动
app.listen(8006,()=>{
    console.log('jquery请求准备完毕')
})
```

#### 2.axios中使用Ajax

##### axios自定义请求，post请求，get请求

```javascript
<body>
    <button style="background: rgb(219, 130, 13)">点击自定义发送请求</button>
    <button style="background: rgb(13, 219, 75)">点击get方法请求</button>
    <button style="background: rgb(10, 25, 236)">点击post方法请求</button>
    <div id="result"></div>
    <!-- 引用axios -->
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
        const btn = document.querySelectorAll("button");
        btn[0].addEventListener("click", () => { 
            /**
             * axios自定义请求方法 
             * url：请求地址
             * method：请求类型
             * data：请求传参
             * timeout：请求响应时间
             * 因是基于promise库，所以用.then() 请求成功回调 .catch 请求失败回调
            */
            axios({
                url: "http://192.168.0.102:8007/axios-server",
                method: "get",
                data: {
                    a: 100,
                    c: 200
                },
                timeout: 3000,
            }).then((data) => {
                console.log(data)
            }).catch((error) => {
                console.log(error)
            })
        });

        btn[1].addEventListener('click',() => {
            /**
             * axios——get请求 有两个参数 
             * 1.url：请求地址，
             * 2.对象：设置get方法的请求配置
             * */
            axios.get("http://192.168.0.102:8007/axios-server",{
                params:{
                    a: 100,
                    b: 200
                },
                timeout: 3000,
            }).then((response) => {
                console.log(response)
            })
        })

        btn[2].addEventListener('click',() => {
            /**
             * axios——post请求 有三个参数
             * 1.url：请求地址，
             * 2.data：请求参数
             * 3.对象：设置post方法的配置      
             * */
            axios.post("http://192.168.0.102:8007/axios-server",
            {
                a: 300,
                b: 200,
                c: 100
            },
            {
                headers: {
                    height:6000
                },
                timeout: 6000
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        })
    </script>
</body>
<script>
// axios 请求配置
let obj = {
   // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get',
  // default

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `headers` 是即将被发送的自定义请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

 // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
</script>
```

```javascript
//引用express模块
const express = require('express');
//实例化对象
const app = express();
//规划路由
//接受所有请求 如果设置自定义请求头需要在all事件接收
app.all('/axios-server',(resquset,response)=>{
    // console.log(response)
    //设置允许自定义请求头
    response.setHeader('Access-Control-Allow-Headers','*')
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
        response.send(obj);
    }, 2000);
})
//监听服务启动
app.listen(8007,()=>{
    console.log('axios请求准备完毕')
})
```

#### 3.fetch中使用Ajax

##### fetch是javascript提供的全局接口

```javascript
 <button style="background: rgb(219, 130, 13);">
            点击fetch自定义发送请求
        </button>
        <div id="result">

        </div>
        <script>
            /**
             * Fetch API 提供了一个 JavaScript 接口，
             * 用于访问和操纵 HTTP 管道的一些具体部分，例如请求和响应。
             * 它还提供了一个全局 fetch() 方法，
             * 该方法提供了一种简单，合理的方式来跨网络异步获取资源。这种功能以前是使用 XMLHttpRequest 实现的。
             * Fetch 提供了一个更理想的替代方案，可以很容易地被其他技术使用，例如  Service Workers。
             * Fetch 还提供了专门的逻辑空间来定义其他与 HTTP 相关的概念，例如 CORS 和 HTTP 的扩展请注意，
             * fetch 规范与 jQuery.ajax() 主要有以下的不同：当接收到一个代表错误的 HTTP 状态码时，
             * 从 fetch() 返回的 Promise 不会被标记为 reject，即使响应的 HTTP 状态码是 404 或 500。
             * 相反，它会将 Promise 状态标记为 resolve （如果响应的 HTTP 状态码不在 200 - 299 的范围内，
             * 则设置 resolve 返回值的 ok 属性为 false ），
             * 仅当网络故障时或请求被阻止时，才会标记为 reject。
             * fetch 不会发送跨域 cookies，除非你使用了 credentials 的初始化选项。
             * 
             * Response.headers 只读包含此 Response 所关联的 Headers 对象。
             * Response.ok 只读包含了一个布尔值，标示该 Response 成功（HTTP 状态码的范围在 200-299）。
             * Response.redirected 只读 Response 是否来自一个重定向，如果是的话，它的 URL 列表将会有多个条目。
             * Response.status 只读 包含 Response 的状态码 （例如 200 表示成功）。
             * Response.statusText 只读 包含了与该 Response 状态码一致的状态信息（例如，OK对应 200）。
             * Response.type 只读 包含 Response 的类型（例如，basic、cors）。
             * Response.url 只读 包含 Response 的URL。
             * Response.useFinalURL 包含了一个布尔值，来标示这是否是该 Response 的最终 URL。
             * Response 实现了 Body 接口，所以以下属性亦可用：
             * Body.body (en-US) 只读一个简单的 getter，用于暴露一个 ReadableStream 类型的 body 内容。
             * Body.bodyUsed (en-US) 只读包含了一个布尔值 (en-US)来标示该 Response 是否读取过 Body。
             * 方法
             * Response.clone() 创建一个 Response 对象的克隆。
             * Response.error() 返回一个绑定了网络错误的新的 Response 对象。
             * Response.redirect() 用另一个 URL 创建一个新的 Response。
             * Response 实现了 Body 接口，所以以下方法同样可用：
             * Body.arrayBuffer() (en-US)
             * 读取 Response 对象并且将它设置为已读（因为 Responses 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 ArrayBuffer 格式的 Promise 对象。
             * Body.blob() (en-US)
             * 读取 Response 对象并且将它设置为已读（因为 Responses 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 Blob 格式的 Promise 对象。
             * Body.formData() (en-US)
             * 读取Response 对象并且将它设置为已读（因为 Responses 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 FormData 格式的 Promise 对象。
             * Body.json() (en-US)
             * 读取 Response 对象并且将它设置为已读（因为 Responses 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 JSON 格式的 Promise 对象。
             * Body.text() (en-US)
             * 读取 Response 对象并且将它设置为已读（因为 Responses 对象被设置为了 stream 的方式，所以它们只能被读取一次），并返回一个被解析为 USVString 格式的 Promise 对象。
             * */
            const btn = document.querySelector("button")
            btn.addEventListener('click',()=>{
                //注意：get的请求中请求体不能有body，需要改为post请求
                fetch("http://192.168.0.102:8008/fetch-server",{
                    //设置请求方法
                    method: 'post',
                    //设置请求头
                    headers: {
                        name: 'admin',
                        password: 'admin',
                    },
                    //设置请求体
                    body: {
                        a: 100,
                        b: 200,
                        c: 300,
                    }
                }).then(response => {
                    return response.json();
                }).then(response => {
                    console.log(response)
                })
            })
        </script>
```

```javascript
//引用express模块
const express = require('express');
//实例化对象
const app = express();
//规划路由
//接受所有请求 如果设置自定义请求头需要在all事件接收
app.all('/fetch-server',(resquset,response)=>{
    // console.log(response)
    //设置允许自定义请求头
    response.setHeader('Access-Control-Allow-Headers','*')
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
    response.send(obj);
})
//监听服务启动
app.listen(8008,()=>{
    console.log('fetch请求准备完毕')
})
```

# Ajax笔记 part4

#### 同源策略

同源策略：当前页面的url和ajax请求目标资源是同源的

同源：协议、域名、端口号必须完全相同

违背同源策略就是需要跨域

先请求的服务器资源，服务器在返回的页面，这样是达到同源策略的标准

```javascript
<button style="background: rgb(219, 130, 13);">
	点击发送同源策略请求
</button>
<div id="result">

</div>
<script>
    /**
    * 同源策略：当前页面的url和ajax请求目标资源是同源的
    * 同源：协议、域名、端口号必须完全相同
    * 违背同源策略就是需要跨域
    * */
    const btn = document.getElementsByTagName("button")[0];
    const result = document.getElementById('result');
    btn.addEventListener('click',() => {
        const x = new XMLHttpRequest();
        //因为是先请求的服务器资源，服务器在返回的页面，这样是属于同源策略的，那么url就可以简写
        x.open("Get",'/data');
        x.send()
        x.onreadystatechange = () => {
        	if(x.readyState == 4){
            	//服务器有可能返回 304 自从上次请求后，请求的网页未修改过。
            	if(x.status >= 200 && x.status < 300){
                	result.innerHTML = x.response
                }
            }
        }
    })
</script>
```

```javascript
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
```

#### jsonp跨域

JSONP跨域的原理：主要就是利用了 script 标签的src没有跨域限制来完成的 只能用于get请求

```javascript
<div id="result">

</div>
<script>
/**
* JSONP的原理：主要就是利用了 script 标签的src没有跨域限制来完成的 只能用于get请求
* 步骤：
* 1.通过script标签向服务器发送get请求，
* 2.服务器返回getData方法调用和赋值
* 3.getData方法调用，形参赋值，接受值向result赋值
* */

function getData(data) {
    const result = document.getElementById('result');
    result.innerHTML = data.name
}
</script>
<script src="http://192.168.3.232:8010/data"></script>
```

```javascript
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
```



#### JSONP跨域实践

```javascript
用户名：<input type="text" id="name">
<p></p>
<script>
const input = document.getElementById('name');
const p = document.querySelector('p');

//声明judge函数
function judgeName(data){
    //更改input边框颜色
    input.style.border = "solid 1px #f00"
    //更改p标签的内容
    p.innerHTML = data.msg; 
}

//input标签失去光标的时，执行事件
input.onblur = () => {
    //获取用户输入的值
    let uName = this.value; 
    //向服务器发送请求
    //1.第一步：创建script标签
    const script = document.createElement("script")
    //2.第二步：设置src 发送get请求
    script.src = "http://192.168.0.102:8011/check-server"
    //3.第三步：向body插入script标签 实例化script
    document.body.appendChild(script);
}
</script>
```

```javascript
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
```



#### jQuery发送json请求

```javascript
<button style="background: rgb(219, 130, 13);">
    点击发送jsonp请求
</button>
<div id="result">

</div>

<script>
//jquery之ajax自定义请求
$("button").eq(0).click(() => {
    //jquery jsonp固定写法在请求接口后面拼接 ?callback=?
    $.getJSON("http://192.168.0.102:8012/jquery-jsonp?callback=?",(data)=>{
        $("#result").html(data.name)
    })
})
</script>
```

```javascript
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
```

#### CORS跨域

在请求方法中设置请求头信息

```
response.setHeader('Access-Control-Allow-Origin','*')
```

例如

```
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
    response.send(obj);
})
```

