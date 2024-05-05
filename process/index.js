/**
 * NodeJS Process模块 是用来获取当前NodeJS进程信息的模块
 * process模块是一个全局模块，无需引入即可使用，这是因为底层将process模块挂载到了global对象上
 * 常用API如下：
 *  1.process.platform 返回操作系统平台 例如：win32===>windows darwin===>mac linux===>linux
 *    与os.platform()的区别是：os.platform()是os模块的API，而process.platform是process模块的API
 *    两者的返回值是一样的
 *  2.process.arch() 返回操作系统CPU架构 例如：x64
 *  与os.arch()的区别是：os.arch()是os模块的API，而process.arch()是process模块的API
 *  两者的返回值是一样的
 *  3.process.argv 返回命令行参数
 *    例如：node index.js --version
 *    返回结果：[ 'C:\\Program Files\\nodejs\\node.exe', 'D:\\node-learning\\process\\index.js', '--version' ]
 *  4.process.cwd() 返回当前工作目录
 *    例如：D:\node-learning\process
 *    与__dirname的区别是：__dirname是nodejs的全局变量，__dirname在ESM模式下用不了，而process.cwd()在ESM模式下可以用
 *  5.process.memoryUsage() 返回内存使用情况
 *    例如：{ rss: 20901888, heapTotal: 5767168, heapUsed: 3355440, external: 102388, arrayBuffers: 938 }
 *    rss: 常驻内存
 *    heapTotal: 堆内存总量
 *    heapUsed: 已使用的堆内存
 *    external: V8引擎内部的C++对象占用的内存
 *    arrayBuffers: ArrayBuffer占用的内存(2进制总量)
 *  6.process.exit() 退出进程
 *    例如：process.exit(0) 0表示正常退出，1表示非正常退出
 *  7.process.kill(process.pid) 杀死进程
 *    例如：process.kill(process.pid) ===> 杀死当前进程
 *  8.process.env 返回所有的环境变量，其中包括用户自定义的环境变量，可以改变环境变量的值，但是只在当前进程有效
 *    例如：{ ALLUSERSPROFILE: 'C:\\ProgramData',
 *    场景：可以在package.json中的scripts中使用cross-env来设置环境变量，例如：
 *    "scripts": {
 *    "test": "cross-env NODE_ENV=development node index.js",
 *    "build": "cross-env NODE_ENV=production node index.js",
 *    "dev": "cross-env NODE_ENV=development node index.js"
 *    }
 *    这样在index.js中就可以通过process.env.NODE_ENV来获取环境变量的值进行不同的操作
 *
 *
 */
console.log(process.platform) // win32
console.log(process.arch) // x64
console.log(process.argv,process.argv.includes('--version') ? '1.0.0' : '无') // 返回命令行参数
console.log(process.cwd()) // 返回当前工作目录 D:\node-learning\process
console.log(process.memoryUsage()) // 返回内存使用情况
// console.log(process.exit())// 退出进程 0表示正常退出，1表示非正常退出
// console.log(process.kill(process.pid)) // 杀死进程
console.log(process.env) // 返回所有的环境变量