## express使用mysql
> 安装依赖
```npm
npm i mysql2 express js-yaml
```

>配置连接信息
```yaml
db:
  user: root
  password: '123456'
  host: localhost
  port: 3306
  database: smz
```

>调用依赖链接数据库
```js
import mysql2 from  'mysql2/promise'
import  fs from 'node:fs'
import jsYaml from "js-yaml";
import express from 'express'

const yaml = fs.readFileSync('./db.config.yaml', 'utf8') // 读取配置文件，为字符串
const config = jsYaml.load(yaml) // 转换为对象
const sql = mysql2.createConnection({ // 异步接收
    ...config.db
})
```

> 编写查询接口并启动服务
```js
const app = express()

// 查询
app.get('/',async (req,res)=>{
    const [data] = await sql.query('select * from user') // 返回一个二维数组，第一个里边是数据，第二个时数据库信息
    res.send(data)
})

// 单个查询动态查询
app.get('/user/:id',async (req,res)=>{
    const [row] = await sql.query('select * from user where id = ?',[req.params.id]) // 返回一个二维数组，第一个里边是数据，第二个时数据库信息
    res.send(row)
})

//新增
app.post('/create',async (req,res)=>{
    const {id,name,age} = req.body
    await sql.query(`insert into user(id,name,age) values(?,?,?)`,[id,name,age])
    res.send({ok:200})
})

//编辑
app.post('/update',async (req,res)=>{
    const {id,name,age} = req.body
    await sql.query('update user set name = ?,age = ? where id = ?',[name, age, id])
    res.send({ok:200})
})

//删除
app.delete('/delete',async (req,res)=>{
    await sql.query('delete from user where id = ?',[req.body.id])
    res.send({ok:200})
})

const port = 3000

app.listen(port, ()=>{
    console.log(3000)
})
```

