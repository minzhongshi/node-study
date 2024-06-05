## EventEmitter
- [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

在Node.js核心API中都是采用异步事件驱动架构，就是通过有效的方法来监听事件状态的变化。并在变化的时候做出对应的动作

```javascript
fs.mkdir('/tmp/a/apple',{recursive: true},(err)=>{
    if (err) throw err
})
```
```javascript
process.on('xxx',()=>{
    
})
```

## 事件模型
Node.js事件模型采用了，`发布订阅设计模式`

发布订阅模式是一种消息范式，消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。
而是将发布的消息分为不同的类别，然后分别发送给不同的订阅者。
订阅者可以选择性地接收消息，也可以选择性地忽略消息。

像Vue2中event bus 和第三方库mitt都是采用了发布订阅模式

### 发布订阅
发布订阅模式一般需要实现以下几个方法
- on：订阅
- emit：发布
- off：取消订阅
- once：订阅一次

### EventEmitter
>Node.js中的EventEmitter是一个构造函数，可以通过实例化的方式来使用

```javascript
const EventEmitter = require('events')
const emitter = new EventEmitter()
```

#### on
>订阅事件

```javascript
emitter.on('event',()=>{
    console.log('触发了event事件')
})
```

#### emit
>发布事件

```javascript
emitter.emit('event')
```

#### off
>取消订阅

```javascript
emitter.off('event',()=>{
    console.log('触发了event事件')
})
```

#### once
>订阅一次

```javascript
emitter.once('event',()=>{
    console.log('触发了event事件')
})
```

#### newListener
>当新的监听器被添加时触发

```javascript
emitter.on('newListener',(event,listener)=>{
    console.log('添加了新的监听器')
})
```

#### removeListener
>当已有的监听器被移除时触发

```javascript
emitter.on('removeListener',(event,listener)=>{
    console.log('移除了已有的监听器')
})
```

#### error
>当触发error事件时，如果没有绑定error事件的监听器，Node.js会抛出错误、打印堆栈跟踪、并退出程序

```javascript
emitter.on('error',(err)=>{
    console.log('触发了error事件')
})
```

#### setMaxListeners
>设置监听器的最大数量，默认情况下，如果为特定事件添加了超过10个监听器，则 EventEmitter 会打印一个警告。 这有助于发现内存泄露。

```javascript
emitter.setMaxListeners(20)
```

#### getMaxListeners
>获取监听器的最大数量

```javascript
emitter.getMaxListeners()
```

#### listenerCount
>获取指定事件的监听器数量

```javascript
emitter.listenerCount('event')
```

#### listeners
>获取指定事件的监听器数组

```javascript
emitter.listeners('event')
```

#### prependListener
>在指定事件的监听器数组的开头添加监听器

```javascript
emitter.prependListener('event',()=>{
    console.log('触发了event事件')
})
```

#### prependOnceListener
>在指定事件的监听器数组的开头添加一次性监听器

```javascript
emitter.prependOnceListener('event',()=>{
    console.log('触发了event事件')
})
```

#### eventNames
>获取所有已注册事件的事件名

```javascript
emitter.eventNames()
```

## 使用者
- process
process模块也可以使用EventEmitter的方法
process内部将EventEmitter原型挂载到了process原型上，并通调用EventEmitter构造函数来实例化了一个EventEmitter实例，因此process也可以使用EventEmitter的方法

```javascript
process.on('xxx',()=>{
    
})
```

这里使用了Object.setPrototypeOf(a,b)方法来设置了原型===>将a的原型设置为b

读取原型的方法有两种：
- Object.getPrototypeOf(a)
- a.__proto__






- fs
- net
- http
- stream
- readline
