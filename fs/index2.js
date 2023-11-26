/**
 * fs模块
 *  1. 写入文件 (替换) fs.writeFileSync
 *  2. 追加写入文件 第三个参数 {flag: 'a'} fs.writeFileSync
 *  3. 创建可写流 (处理大文件) fs.createWriteStream
 *  4. 软连接 硬链接 pnpm底层
 *
 *  第三个参数options：
 *   encoding: 编码格式 ===> utf-8、ascii、base64、binary、hex、ucs2、utf16le
 *   mode: 权限 ===> 0o666、0o777
 *   flag: 操作方式 ===> r、r+、rs、rs+、w、wx、w+、wx+、a、ax、a+、ax+
 *    ‘r’ - 打开文件用于读取。如果文件不存在则发生异常。
 *    ‘r+’ - 打开文件用于读取和写入。如果文件不存在则发生异常。
 *    ‘rs’ - 打开文件用于同步读取。指示操作系统绕过本地文件系统缓存。
 *    ‘rs+’ - 打开文件用于同步读取和写入。指示操作系统绕过本地文件系统缓存。
 *    注意：这不会将fs.open()或fsPromises.open()的同步标志与文件同步。
 *
 *    ‘w’ - 打开文件用于写入。文件会被创建（如果文件不存在）或截断（如果文件存在）。
 *    ‘wx’ - 类似于‘w’，但如果路径存在，则失败。
 *    ‘w+’ - 打开文件用于读取和写入。文件会被创建（如果文件不存在）或截断（如果文件存在）。
 *    ‘wx+’ - 类似于‘w+’，但如果路径存在，则失败。
 *    ‘a’ - 打开文件用于追加。如果文件不存在，则创建该文件。
 *    ‘ax’ - 类似于‘a’，但如果路径存在，则失败。
 *    ‘a+’ - 打开文件用于读取和追加。如果文件不存在，则创建该文件。
 *    ‘ax+’ - 类似于‘a+’，但如果路径存在，则失败。
 *    注意：’a’和’a+’选项只适用于可写文件。
 *
 *    读取文件时，如果没有指定编码格式，返回的是Buffer类型
 *    写入文件时，如果没有指定编码格式，写入的是Buffer类型
 */
import fs from 'node:fs'

// 替换写入文件
fs.writeFileSync('./index.txt', 'hello world')

// 追加写入文件
fs.writeFileSync('./index.txt', '\n追加内容',{flag: 'a'}) // append
fs.appendFileSync('./index.txt', '\n追加API追加内容') // appendAPI

// 创建可写流
const ws = fs.createWriteStream('./index.txt', {flags: 'a'})
let verse = [
    '你好啊',
    '我很好',
    '你呢？'
]
verse.forEach(item => {
    ws.write(item + '\n')
})
ws.end()
ws.on('close', () => {
    console.log('可写流关闭了')
})
ws.on('error', (err) => {
    console.log(err)
})
ws.on('open', () => {
    console.log('可写流打开了')
})
ws.on('finish', () => {
    console.log('可写流结束了')
})

// 硬链接 共享文件，备份文件
fs.linkSync('./index.txt', './index2.txt')

// 软连接 快捷方式（需要管理员权限）
fs.symlinkSync('./index.txt', './index3.txt')
