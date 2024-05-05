/**
 * NodeJS OS 模块 os模块提供了一些基本的系统操作函数
 * 常用API如下：
 *   1.os.platform() 返回操作系统平台 例如：win32===>windows darwin===>mac linux===>linux
 *   2.os.release() 返回操作系统版本号 例如：10.0.18362 ====>windows10 19H1
 *      类似于os.type()，但是os.type()返回的是操作系统名称，例如：Windows_NT
 *   3.os.type() 返回操作系统名称 例如：Windows_NT
 *   4.os.version() 返回操作系统版本号 例如： Windows 11 Enterprise ====>Windows 11 企业版
 *   5.os.homedir() 返回当前用户的home目录,底层原理：windows===>%userprofile% mac===> %HOME 例如：
 *   6.os.arch() 返回操作系统CPU架构 例如：x64
 *   7.os.cpus() 返回CPU信息,其中model是CPU型号，speed是CPU频率，times是CPU使用时间，length是CPU核心数
 *   8.os.networkInterfaces() 返回网络接口信息
 */

const os = require('node:os')
console.log(os.platform()) // win32
console.log(os.release()) // 10.0.22621
console.log(os.type()) // Windows_NT
console.log(os.version())// Windows 11 Enterprise
console.log(os.homedir()) // C:\Users\Administrator
console.log(os.arch()) // x64
console.log(os.cpus()) // 返回CPU信息
console.log(os.networkInterfaces())// 返回网络接口信息


