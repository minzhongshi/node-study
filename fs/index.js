/**
 * fs模块
 * 1. 读取文件 fs.readFile(path[, options], callback)
 *  1.1 异步 同步 promise
 * 2. 可读流 createReadStream(path[, options])
 * 3. 创建文件 recursive 递归
 * 4. 删除文件 rm
 * 5. 重命名文件 rename、renameSync
 * 6. 监听文件变化 watchFile、watch
 * 7. 源码 libuv
 *   fs史通过 c++ 层的 FSReqCallback 这个类对 libuv 的uv_fs_t 进行封装，然后通过 libuv 的 uv_fs_* 系列函数来调用操作系统的文件系统接口。将参数透传给libuv.
 * 8. 注意事项 事件循环
 *    setImmediate、setTimeout、setInterval等计时器都是V8完成的，而fs的操作是由libuv线程池中的线程完成的，所以fs的操作完成后才会将V8事件推入执行栈
 */
import fs from 'node:fs'
import fs2 from 'node:fs/promises'

// 1. 读取文件 异步
fs.readFile(
    './index.txt',
    {
        encoding:'utf-8',
        flag: 'r'
    },
    (err, data) => {
        if (err) throw err
        console.log(data)
    }
)

// 1. 读取文件 同步（会阻塞，返回二进制流）
let result = fs.readFileSync( './index.txt',)
console.log(result.toString("utf-8"))

// 1. 读取文件 promise(返回对象)
fs2.readFile('./index.txt').then(res => {
    console.log(res.toString('utf-8'))
}).catch(err => {
    console.log(err)
})

// 2. 可读流（处理大文件）
const rs = fs.createReadStream('./index.txt')
rs.on('open', () => {
    console.log('可读流打开了')
})
rs.on('data', (data) => {
    console.log(data.toString('utf-8'))
})
rs.on('end', () => {
    console.log('可读流结束了')
})
rs.on('close', () => {
    console.log('可读流关闭了')
})
rs.on('error', (err) => {
    console.log(err)
})

// 3. 创建文件(第二个参数可添加递归用来创建多级目录)
fs.mkdirSync('./test', {recursive: true})

// 4. 删除文件(第二个参数可添加递归用来删除多级目录)
fs.rmSync('./test',{recursive: true})

// 5. 重命名文件
// fs.renameSync('./index.txt', './index2.txt')

// 6. 监听文件变化
// 6.1 watchFile
   // curr: 当前文件状态
   // prev: 修改前文件状态
// 6.2 watch
    // eventType: 事件类型
    // filename: 文件名
fs.watchFile('./index.txt', (curr, prev) => {
    console.log(curr, prev)
})
fs.watch('./index.txt', (eventType, filename) => {
    console.log(eventType, filename)
})

// 注意事项
// fs IO操作都是由libuv线程池中的线程完成的
// IO操作完成后才会将V8事件推入执行栈
fs.readFile('./index.txt', {
    encoding: 'utf-8',
    flag: 'r'
}, (err, data) => {
    console.log(data)
})
// 等待本轮事件循环结束后执行
// 计时器都是V8完成的
setImmediate(() => {
    console.log('setImmediate')
})
