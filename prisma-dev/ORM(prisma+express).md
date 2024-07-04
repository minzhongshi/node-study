## prisma
> prisma,Prisma 是一个现代化的数据库工具套件，用于简化和改进应用程序与数据库之间的交互。它提供了一个类型安全的查询构建器和一个强大的 ORM（对象关系映射）层，使开发人员能够以声明性的方式操作数据库。
Prisma 支持多种主流数据库，包括 PostgreSQL、MySQL 和 SQLite，它通过生成标准的数据库模型来与这些数据库进行交互。使用 Prisma，开发人员可以定义数据库模型并生成类型安全的查询构建器，这些构建器提供了一套直观的方法来创建、更新、删除和查询数据库中的数据。

Prisma 的主要特点包括：

- 类型安全的查询构建器：Prisma 使用强类型语言（如 TypeScript）生成查询构建器，从而提供了在编译时捕获错误和类型检查的能力。这有助于减少错误，并提供更好的开发人员体验。
- 强大的 ORM 层：Prisma 提供了一个功能强大的 ORM 层，使开发人员能够以面向对象的方式操作数据库。它自动生成了数据库模型的 CRUD（创建、读取、更新、删除）方法，简化了与数据库的交互。
- 数据库迁移：Prisma 提供了数据库迁移工具，可帮助开发人员管理数据库模式的变更。它可以自动创建和应用迁移脚本，使数据库的演进过程更加简单和可控。
- 性能优化：Prisma 使用先进的查询引擎和数据加载技术，以提高数据库访问的性能。它支持高级查询功能，如关联查询和聚合查询，并自动优化查询以提供最佳的性能


### 安装

- 安装 Prisma CLI
```npm
npm install -g prisma
```

- 初始化项目
```npm
prisma init --datasource-provider mysql
```

- 连接mysql
> 修改.env文件 [DATABASE_URL="mysql://账号:密码@主机:端口/库名"]

-创建表:prisma/schema.prisma
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// 编写表结构
// 用户
model Post {
  id       Int     @id @default(autoincrement()) //id 整数 自增
  title    String  //title字符串类型
  publish  Boolean @default(false) //发布 布尔值默认false
  author   User   @relation(fields: [authorId], references: [id]) // 外键
  authorId Int  // 作者 关联用户表 关联关系 authorId 关联user表的id
}


// 文章
model User {
  id    Int    @id @default(autoincrement()) // id自增
  name  String
  email String @unique //唯一
  posts Post[]  // 一对多，一个用户有多个二文章
}

```

- 执行 生成数据库和表
```npm
prisma migrate dev
```

- 查询

```js
import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express()
const port: number = 3000


app.use(express.json())

//关联查找
app.get('/', async (req, res) => {
    const data = await prisma.user.findMany({
        include: {
            posts: true
        }
    })
    res.send(data)
})
//单个查找
app.get('/user/:id', async (req, res) => {
    const row =  await prisma.user.findMany({
        where: {
            id: Number(req.params.id)
        }
    })
    res.send(row)
})
//新增
app.post('/create', async (req, res) => {
    const { name, email } = req.body
    const data = await prisma.user.create({
        data: {
            name,
            email,
            posts: {
                create: {
                    title: '标题',
                    publish: true
                },
            }
        }
    })
    res.send(data)
})

//更新
app.post('/update', async (req, res) => {
    const { id, name, email } = req.body
    const data = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            name,
            email
        }
    })
    res.send(data)
})

//删除
app.post('/delete', async (req, res) => {
    const { id } = req.body
    await prisma.post.deleteMany({
        where: {
            authorId: Number(id)
        }
    })
    const data = await prisma.user.delete({
        where: {
            id: Number(id),
        },
    })
    res.send(data)
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

```