// import mysql2 from  'mysql2/promise'
import  fs from 'node:fs'
import jsYaml from "js-yaml";
import express from 'express'
import knex from 'knex'

const yaml = fs.readFileSync('./db.config.yaml', 'utf8') // 读取配置文件，为字符串
const config = jsYaml.load(yaml) // 转换为对象
// const sql = await mysql2.createConnection({ // 异步接收
//     ...config.db
// })

// 连接数据库
const db = knex({
    client: 'mysql2',
    connection:config.db
})

// 新建表
db.schema.createTableIfNotExists('list', table=>{ //当表存在时不做处理
    table.increments('id')// id 主键 自增
    table.integer('age')// 整数
    table.string('name')// 字符串
    table.string('hobby')
    table.timestamps(true,true)// 船舰时间
}).then(()=>{
    console.log('创建时成功')
})

// 保持原子一致性
db.transaction(async (trx) => {
    try {
        await trx('list').update({money: -100}).where({id: 1}) //A
        await trx('list').update({money: +100}).where({id: 2}) //B
        await trx.commit() //提交事务
    } catch (err) {
        await trx.rollback() //回滚事务
    }

}).then(r =>{
    console.log('成功')
}).catch((err)=>{
    console.log(err)
})

const  app = express()
app.use(express.json())

// 查询
app.get('/',async (req,res)=>{
    //const [data] = await sql.query('select * from user') // 返回一个二维数组，第一个里边是数据，第二个时数据库信息
    const data = await db('list').select()
    const count = await db('list').count("* as total")
    // API不满足也可以用SQL语句
    db.raw("select * from user").then((data)=>{
        console.log(data)
        const sql = db('list').select().toSQL().sql //反编译出SQL
    })
    const table = await db('user').select().leftJoin('list','user.id','list.id')// 左连接
    res.json({
        data,
        total:count[0].total
    })
})

// 单个查询动态查询
app.get('/user/:id',async (req,res)=>{
    //const [row] = await sql.query('select * from user where id = ?',[req.params.id]) // 返回一个二维数组，第一个里边是数据，第二个时数据库信息
    const row = await db('list').select().where({id:req.params.id})
    const count = await db('list').count("* as total")
    res.json({
        data: row,
        total:count[0].total
    })
})

//新增
app.post('/create',async (req,res)=>{
    const {name,age,hobby} = req.body
    //await sql.query(`insert into user(id,name,age) values(?,?,?)`,[id,name,age])
    await db('list').insert({name,age,hobby})
    res.send({ok:200})
})

//编辑
app.post('/update',async (req,res)=>{
    const {name,age,hobby,id} = req.body
    //await sql.query('update user set name = ?,age = ? where id = ?',[name, age, id])
    await db('list').update({name,age,hobby}).where({id})
    res.send({ok:200})
})

//删除
app.delete('/delete',async (req,res)=>{
    //await sql.query('delete from user where id = ?',[req.body.id])
    await db('list').delete().where({id:req.body.id})
    res.send({ok:200})
})

const port = 3000

app.listen(port, ()=>{
    console.log(3000)
})