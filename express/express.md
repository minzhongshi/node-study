## express简介
> Express是一个流行的Node.js Web应用程序框架，用于构建灵活且可扩展的Web应用程序和API。它是基于Node.js的HTTP模块而创建的，简化了处理HTTP请求、响应和中间件的过程。

- 简洁而灵活：Express提供了简单而直观的API，使得构建Web应用程序变得简单快捷。它提供了一组灵活的路由和中间件机制，使开发人员可以根据需求定制和组织应用程序的行为。
- 路由和中间件：Express使用路由和中间件来处理HTTP请求和响应。开发人员可以定义路由规则，将特定的URL路径映射到相应的处理函数。同时，中间件允许开发人员在请求到达路由处理函数之前或之后执行逻辑，例如身份验证、日志记录和错误处理。
- 路由模块化：Express支持将路由模块化，使得应用程序可以根据不同的功能或模块进行分组。这样可以提高代码的组织性和可维护性，使得多人协作开发更加便捷。
- 视图引擎支持：Express可以与各种模板引擎集成，例如EJS、Pug（以前称为Jade）、Handlebars等。这使得开发人员可以方便地生成动态的HTML页面，并将数据动态渲染到模板中。
- 中间件生态系统：Express有一个庞大的中间件生态系统，开发人员可以使用各种中间件来扩展和增强应用程序的功能，例如身份验证、会话管理、日志记录、静态文件服务等。


## 使用
安装express, express是个函数需要调用

```npm
npm i express
```

中间件，日志安装
```npm
npm i log4js
```

```js
import express from 'express'

const app= express()
app.use(express.json()) //支持post解析json

/**
 * get
 * 参数1：api地址
 * 参数2：回调函数 req时请求 res是响应
 *
 * request接收客户端参数
 * response返回客户端的参数
 *
 * req.query接收前端参数
 */
app.get('/get',(req,res)=>{
    console.log(req.query)
    res.send('get')
})


/**
 * post
 * req.body接收前端参数,需要一个中间件来做处理，不然获取到的时undefined
 * app.use(express.json()) 支持post解析json
 */
app.post('/post',(req,res)=>{
    console.log(req.body)
    res.send('post')
})

/**
 * 动态参数
 * http://localhost:3000/get/996
 * req.params接收前端参数
 */
app.get('/get/:id',(req,res)=>{
    console.log(req.params)
    res.send('动态参数')
})

app.listen(3000, ()=>{
    console.log('3000')
})
```

## 模块化

在模块文件中需要使用 express.Router() 创建路由  并导出

```js
import express from "express";

const router = express.Router()

router.post('/login',(req,res)=>{
    res.json({
        code:200,
        msg: "成功",
        data:[
            {id: 1}
        ]
    })
})

export default router
```

在请求主体中使用中间件进行注册，并且保证有唯一的地址

```js
import User from './src/user.js'
import List from './src/list.js'

app.use('/user',User)
app.use('/list',List)
```

## 中间件编写

```js
import log4js from 'log4js'

// 控制台输出，并且存在本地文件
log4js.configure({
    appenders:{
        out:{
            type:"stderr", // 控制台
            layout:{
                type:"colored" // 控制台样式
            }
        },
        file:{// 文件输出
            filename:"logs/server.log", //
            type:"file"
        }
    },
    categories:{
        default:{
            appenders:["out","file"], // 使用 out 和 file 输出器
            level:"debug" // 设置日志级别为 debug
        }
    }
})

// 获取 logger
const logger = log4js.getLogger('default');
/**
 *
 * @param req 接收前端传递数据
 * @param res 返回给前端的数据
 * @param next 是否执行下一个中间件 如果不写就一直在阻塞
 * @constructor 每个请求都会经过中间件
 */
const LoggerMiddleware = (req,res,next)=>{
    logger.debug(`${req.method} ${req.url}`); // 记录请求方法和URL
    next();
}

export default LoggerMiddleware
```

主体中注册
```js
import LoggerMiddleware from "./middleware/logger.js";
app.use(LoggerMiddleware) //注册中间件
```


## 防盗链

>防盗链（Hotlinking）是指在网页或其他网络资源中，通过直接链接到其他网站上的图片、视频或其他媒体文件，从而显示在自己的网页上。这种行为通常会给被链接的网站带来额外的带宽消耗和资源浪费，而且可能侵犯了原始网站的版权。
为了防止盗链，网站管理员可以采取一些措施：

- 通过HTTP引用检查：网站可以检查HTTP请求的来源，如果来源网址与合法的来源不匹配，就拒绝提供资源。这可以通过服务器配置文件或特定的脚本实现。
- 使用Referrer检查：网站可以检查HTTP请求中的Referrer字段，该字段指示了请求资源的来源页面。如果Referrer字段不符合预期，就拒绝提供资源。这种方法可以在服务器配置文件或脚本中实现。
- 使用访问控制列表（ACL）：网站管理员可以配置服务器的访问控制列表，只允许特定的域名或IP地址访问资源，其他来源的请求将被拒绝。
- 使用防盗链插件或脚本：一些网站平台和内容管理系统提供了专门的插件或脚本来防止盗链。这些工具可以根据需要配置，阻止来自未经授权的网站的盗链请求。
- 使用水印技术：在图片或视频上添加水印可以帮助识别盗链行为，并提醒用户资源的来源。


## 响应头和请求头

### 响应头
>HTTP响应头（HTTP response headers）是在HTTP响应中发送的元数据信息，用于描述响应的特性、内容和行为。它们以键值对的形式出现，每个键值对由一个标头字段（header field）和一个相应的值组成。

```
Access-Control-Allow-Origin:*
Cache-Control:public, max-age=0, must-revalidate
Content-Type:text/html; charset=utf-8
Server:nginx
Date:Mon, 08 Jan 2024 18:32:47 GMT
```

响应头与跨域相关
>跨域资源共享（Cross-Origin Resource Sharing，CORS）是一种机制，用于在浏览器中实现跨域请求访问资源的权限控制。当一个网页通过 XMLHttpRequest 或 Fetch API 发起跨域请求时，浏览器会根据同源策略（Same-Origin Policy）进行限制。同源策略要求请求的源（协议、域名和端口）必须与资源的源相同，否则请求会被浏览器拒绝

- 协议、端口、域名 不同就会触发CORS跨域

解决方式：
后端添加响应头，'*'指所有资源访问，如果使用session，获取不到session；Origin指固定ip，

```js
app.use('*',(req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*') // */Origin
    next()
})
```

- 当使用restful风格的API时，还是会报错误 ，因为`Access-Control-Allow-Methods`默认只支持get、post、head

解决：
需要在改响应头后追加
```js
res.setHeader('Access-Control-Allow-Methods','PUT,DELETE,PATCH')
```

- 预检请求，非简单请求都会触发预检请求
  - 自定义请求方法：当使用非简单请求方法（Simple Request Methods）时，例如 PUT、DELETE、CONNECT、OPTIONS、TRACE、PATCH 等，浏览器会发送预检请求。
  - 自定义请求头部字段：当请求包含自定义的头部字段时，浏览器会发送预检请求。自定义头部字段是指不属于简单请求头部字段列表的字段，例如 Content-Type 为 application/json、Authorization 等。
  - 带凭证的请求：当请求需要在跨域环境下发送和接收凭证（例如包含 cookies、HTTP 认证等凭证信息）时，浏览器会发送预检请求。



- cors Content-type默认只支持：application/x-www-form-urlencoded | multipart/form-data | text/plain
若要支持其它：则需要添加 `'Access-Control-Allow-Headers','Content-Type' `响应头。


- 自定义响应头
自定义的响应头，如果前端需要读取，需要后端暴露出来

```js
res.set('smz',111)
    res.setHeader('Access-Control-Expose-Headers','smz') // 抛出
```

### SSE 单工通讯
>后端实时给前端发数据

需要后端添加响应头
```js
 res.setHeader('Content-Type','text/event-stream')
res.write('event: test\n') // 默认 message 修改为test
res.write('data: '+Date.now()+'\n\n') // 数据
```
前端需要通过`EventSource`接数据
```js
   const sse = new EventSource('<请求地址>')

//监听事件，默认 message
sse.addEventListener('message',(e)=>{

})
```

