/**
 * NodeJS child_process模块 是用来创建子进程的模块
 *   子进程是在主进程中创建的进程，主进程是nodejs进程
 *   业务场景：
 *   （1）在nodejs中，如果有一个耗时的操作，例如：读取文件，读取数据库，读取网络接口，这些操作都是异步的
 *   如果在主进程中执行这些操作，会阻塞主进程，导致主进程无法执行其他操作，这时候就可以创建子进程来执行这些耗时的操作
 *   （2）编写前端工程化工具类的时候，例如：webpack，vue-cli，create-react-app等，child_process模块起到很大作用
 *   （3）在nodejs中，如果需要执行一些外部程序，例如：python，java，c++等，这时候也可以使用child_process模块
 *   （4）在nodejs中，如果需要执行一些shell命令，例如：ls，mkdir，rm等，这时候也可以使用child_process模块
 *   （5）在nodejs中，如果需要创建一个守护进程，这时候也可以使用child_process模块
 *   （6）处理CPU密集型任务，例如：图片压缩，视频转码等，这时候也可以使用child_process模块
 *
 *   child_process模块的常用API如下：API分为同步和异步两种：带Sync的是同步API，不带Sync的是异步API
 *   1.child_process.exec(command[, options][, callback]) 该方法是异步的，用于执行shell命令，与某些程序交互，存在字节上限200kb，超过报错
 *      command：要执行的shell命令
 *      options：可选参数，是一个对象，可以设置配置项
 *               cwd:子进程当前工作目录 默认是当前目录
 *               env：环境变量键值对 默认是process.env
 *               encoding：编码格式 默认是utf-8
 *               timeout：超时时间 默认是0
 *               maxBuffer：最大缓存 默认是200kb
 *               killSignal：结束信号 默认是SIGTERM
 *               uid：设置用户id
 *               gid：设置组id
 *      callback：可选参数，是一个回调函数，用于接收执行结果
 *      返回值：返回一个子进程对象
 *   2.child_process.execSync(command[, options]) 该方法是同步的，用于执行较小shell命令,立马拿到结果，与某些程序交互
 *      command：要执行的shell命令
 *      options：可选参数，是一个对象，可以设置cwd，env，encoding，timeout，maxBuffer，killSignal，uid，gid等参数
 *      返回值：返回一个子进程对象
 *   3.child_process.spawn(command[, args][, options]) 该方法是异步的，用于执行大量shell命令，与某些程序交互，返回的是流没有字节上限,有自己的关闭事件
 *      command：要执行的shell命令
 *      args：可选参数，是一个数组，用于传递命令参数
 *      options：可选参数，是一个对象，可以设置cwd，env，encoding，timeout，maxBuffer，killSignal，uid，gid等参数，与exec方法的options参数一样
 *      返回值：返回一个子进程对象，有一个stdout属性，该属性是一个可读流，用于接收子进程的输出
 *   4.child_process.spawnSync(command[, args][, options]) 该方法是同步的，用于执行大量shell命令，与某些程序交互，返回的史流没有字节上限,有自己的关闭事件
 *   5.child_process.fork(modulePath[, args][, options]) 该方法是异步的，只能接收js模块，用来创建nodejs子进程，通过IPC通信，IPC基于libuv，是nodejs的底层库
 *      modulePath：要执行的nodejs模块的路径
 *      args：可选参数，是一个数组，用于传递命令参数
 *      options：可选参数，是一个对象，可以设置cwd，env，encoding，timeout，maxBuffer，killSignal，uid，gid等参数，与exec方法的options参数一样
 *      返回值：返回一个子进程对象，有一个stdout属性，该属性是一个可读流，用于接收子进程的输出
 *     与spawn方法的区别是：
 *      （1）fork方法只能执行nodejs模块，而spawn方法可以执行任意命令
 *      （2）fork方法返回的子进程对象是一个EventEmitter对象，该对象有一个send方法，可以向子进程发送消息
 *      （3）fork方法返回的子进程对象，有一个pid属性，用于获取子进程的进程id
 *      （4）fork方法返回的子进程对象，有一个connected属性，用于判断子进程是否连接
 *      （5）fork方法返回的子进程对象，有一个disconnect方法，用于断开连接
 *      （6）fork方法返回的子进程对象，有一个kill方法，用于杀死子进程
 *    6.child_process.execFile(file[, args][, options][, callback]) 该方法是异步的，用于执行可执行文件
 *       file：要执行的可执行文件的路径
 *       args：可选参数，是一个数组，用于传递命令参数
 *       options：可选参数，是一个对象，可以设置cwd，env，encoding，timeout，maxBuffer，killSignal，uid，gid等参数
 *       callback：可选参数，是一个回调函数，用于接收执行结果
 *       返回值：返回一个子进程对象
 *
 *
 *    exec -> execFile -> spawn -> fork
 *
 *
 *
 *
 */

const{ exec, execSync, spawn,fork,execFile } =require('node:child_process')

// exec('node -v', (err, stdout, stderr) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log(stdout)
// })
// const nodeVersion = execSync('node -v', { encoding: 'utf-8' })// 获取node版本号
// console.log(nodeVersion)
// // execSync('mkdir test')// 创建文件夹
// execSync('start chrome https://www.baidu.com')// 用谷歌打开百度网站

// const {stdout } = spawn('netstat',['-a'])// 获取网络状态
// stdout.on('data', data => {// 监听data事件，获取数据
//     console.log(data.toString())
// })
// stdout.on('close', () => {// 监听close事件，关闭流
//     console.log('close')
// })

// const path = require('node:path')
// execFile(path.resolve(__dirname, './bat.cmd'), (err, stdout, stderr) => {// 执行可执行文件
//     if (err) {
//         console.log(err)
//         return
//     }
//     console.log(stdout.toString())
// })

const child = fork('./child.js')// 创建子进程
child.send('hello child')// 向子进程发送消息
child.on('message', msg => {// 监听message事件，接收子进程发送的消息
    console.log(msg)
})
child.on('close', () => {// 监听close事件，关闭子进程
    console.log('close')
})

