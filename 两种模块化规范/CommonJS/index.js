/**
 * Common.js 模块化规范
 *   五种模式导入
 *    1. 引入自己编写的模块
 *          require('./test.js')
 *    2. 引入第三方模块
 *          const md5 = require('md5')
 *    3. 引入内置模块 fs http url path os child_process
 *          const fs = require('node:fs')
 *    4. 引入json文件
 *          const data = require('./data.json')
 *    5. 引入C++扩展模块 addon napi 通过node-gay编译 ===>.node文件
 *          const addon = require('./build/Release/addon.node')
 *
 *    导出
 *    module.exports = {} 导出对象
 *    module.exports = () => {return} 导出函数
 *
 */
// 1. 引入自己编写的模块
require('./test.js')

// 2. 引入第三方模块
const md5 = require('md5')
console.log(md5('123456'))

// 3. 引入内置模块
const fs = require('node:fs') // 高版本node需要加上node:前缀
console.log(fs)

// 4. 引入json文件
const data = require('./data.json')
console.log(data)

// 5. 引入C++扩展模块 addon napi 通过node-gay编译 ===>.node文件
// const addon = require('./build/Release/addon.node')
// console.log(addon.hello())

// module.exports
const data2 = require('./test2.js')
console.log(data2)
// 也可以解构形式
const {success,error,mySqrt} = require('./test2.js')
console.log(success,error,mySqrt(8))
