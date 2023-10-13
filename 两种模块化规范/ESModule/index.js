/**
 * ESModule
 *    导入：不能解构赋值
 *      import xxx from 'xxx' :对应 export default xxx
 *      import {xxx,xxx} from 'xxx' :对应 export {xxx,xxx}，这里不是解构赋值，而是按照名字去匹配
 *
 *    导出：
 *       export default xxx :只能有一个
 *       export xxx :可以有多个
 *
 *     拿到所有导出的内容：
 *       import * as xxx from 'xxx'
 *
 *     别名：
 *       import {xxx as yyy} from 'xxx'
 *
 *     动态引入：函数式内部引入
 *       import('xxx').then(res => {})
 */

// export default xxx
import ESModule from './text.js'
console.log(ESModule)


// export {xxx,xxx}
import { name, age, sayHi } from './text.js'
sayHi()
console.log(name, age)

// 拿到所有导出的内容：
import * as all from './text.js'
console.log(all)

// 实验性引入JSON文件
// Importing JSON modules is an experimental feature and might change at any time
import data from './data.json' assert {type: 'json'}
console.log(data)