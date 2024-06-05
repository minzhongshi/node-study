const eventEmitter = require('events')

const bus = new eventEmitter()

// 订阅一个事件
bus.on('test', (name) => {
    console.log(name)
})

// 发布一个事件
bus.emit('test', 'smz')

// 订阅一个事件，只执行一次
bus.once('test', (name) => {
    console.log(name)
})

// process
const fn = function (){}
fn.prototype.test = 111
let a = new fn()
console.log(a.test)// 直接访问实例上的属性，会通过原型链找到原型上的属性
console.log(a.__proto__.test)// 通过__proto__属性访问原型上的属性
console.log(a.constructor.prototype.test)// 通过constructor属性访问原型上的属性
console.log(Object.getPrototypeOf(a).test)// 通过Object.getPrototypeOf()方法访问原型上的属性




