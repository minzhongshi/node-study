import express from 'express'

const app= express()
app.use(express.json()) //支持post解析json

import User from './src/user.js'
import List from './src/list.js'
import LoggerMiddleware from "./middleware/logger.js";
app.use(LoggerMiddleware) //注册中间件

app.use('/user',User)
app.use('/list',List)
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
// app.get('/get',(req,res)=>{
//     console.log(req.query)
//     res.send('get')
// })


/**
 * post
 * req.body接收前端参数,需要一个中间件来做处理，不然获取到的时undefined
 * app.use(express.json()) 支持post解析json
 */
// app.post('/post',(req,res)=>{
//     console.log(req.body)
//     res.send('post')
// })

/**
 * 动态参数
 * http://localhost:3000/get/996
 * req.params接收前端参数
 */
// app.get('/get/:id',(req,res)=>{
//     console.log(req.params)
//     res.send('动态参数')
// })

app.listen(3000, ()=>{
    console.log('3000')
})