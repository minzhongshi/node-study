/**
 * node定义全局变量，node环境下是没有window对象的，所以不能使用window.name = '全局变量'
 * 1. global ===> global.name = '全局变量';
 * 2. ES2020 globalThis ===> globalThis.name2 = '浏览器和node环境都支持-全局变量';
 *
 * 全局API
 * JS ===> ECMAScript + BOM + DOM
 * node ===> ECMAScript + nodeAPI 是没有BOM和DOM的不能使用相关API
 *
 *    ECMAScript：
 *      console.log()
 *      Math
 *      Date
 *      Promise
 *      Symbol
 *      Reg
 *
 *    nodeAPI：
 *       fs
 *       http
 *       url
 *       path
 *       os
 *       dirname: __dirname ===> 当前文件所在的文件夹的绝对路径
 *       filename: __filename ===> 当前文件的绝对路径
 *       extname: path.extname(__filename) ===> 获取文件的后缀名
 *       Buffer: 二进制数据
 *           Buffer.from('hello') ===> 将字符串转换成buffer <Buffer 68 65 6c 6c 6f>
 *           Buffer.alloc(10) ===> 创建一个长度为10的buffer <Buffer 00 00 00 00 00 00 00 00 00 00>
 *           Buffer.allocUnsafe(10).fill(0).toString('base64') ===> 创建一个长度为10的buffer 'AAAAAAAAAA=='
 *       process: 处理进程
 *           process.env ===> 获取环境变量
 *           peocess.argv ===> 获取命令行参数
 *           process.cwd() ===> 获取当前工作目录
 *           process.chdir() ===> 改变当前工作目录
 *           process.nextTick() ===> 下一队列
 *           process.platform ===> 获取当前系统平台
 *           process.kill() ===> 杀死进程
 *           process.on() ===> 监听事件
 *           process.exit() ===> 退出进程
 *           process.memoryUsage() ===> 获取内存使用情况
 *           process.uptime() ===> 获取进程运行时间
 *           process.hrtime() ===> 获取高精度时间
 *

 */

global.name = '全局变量';
globalThis.name2 = '浏览器和node环境都支持-全局变量';
require('./child.js');

