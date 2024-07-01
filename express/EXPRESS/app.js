import express from 'express'

const app =express()

const whiteList = ['localhost'] // 白名单

app.use('*',(req,res,next)=>{
    res.set('smz',111)
    res.setHeader('Content-Type','text/event-stream')
    res.setHeader('Access-Control-Expose-Headers','smz') // 抛出
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','PUT,DELETE,PATCH')
    res.write('event: test\n') // 默认 message 修改为test
    res.write('data: '+Date.now()+'\n\n')
    next()
})

const preventHotLingking = (req,res,next) => {
   // 获取 referer 直接打开的资源获取不到，需要请求
    const referer = req.get('referer')
    if (referer){
        const {hostname} = new URL(referer)
        if (!whiteList.includes(hostname)){
            res.status(403).send('禁止访问')
            return
        }
    }
    console.log(referer)
    next()
}
app.use(preventHotLingking)
/**
 * 初始化静态资源
 */
app.use('/assets',express.static('static'))

app.listen(3000,()=>{
    console.log(3000)
})