## Node.js模块化
Node.js的模块化遵循两种规范：`CommonJS`和`ES6 Module`

---

### CommonJS
- 每个文件就是一个模块，有自己的作用域
- 在模块内部module变量代表模块本身
- module.exports属性代表模块对外接口
- require方法用于加载模块
- 模块加载的顺序，按照其在代码中出现的顺序

#### 引入模块
- 支持引入内置模块，如`http`、`fs`、`os`、`child_process`等node.js内置模块
- 支持引入第三方模块，如`express`、`koa`、`md5`等第三方模块
- 支持引入自定义模块，如`./module.js`、`./module`、`./module.json`等自定义模块
- 支持引入addon C++扩展模块，如`./module.node`等C++扩展模块

#### 使用
- 生成package.json文件
```sh
npm init -y
```
- 修改type属性为CommonJS
```json
{
  "type": "commonjs"
}
```

---

### ES6 Module
- 每个文件就是一个模块，有自己的作用域
- 在模块内部`export`关键字用于导出模块对外接口
- `import`关键字用于加载模块
- 模块加载的顺序，按照其在代码中出现的顺序
- `export`和`import`命令只能在模块的顶层，不能在代码块之中

#### 引入模块
- 支持引入内置模块，如`http`、`fs`、`os`、`child_process`等node.js内置模块
- 支持引入第三方模块，如`express`、`koa`、`md5`等第三方模块
- 支持引入自定义模块
- 不支持引入addon C++扩展模块，如`./module.node`等C++扩展模块
- 不支持引入json文件，如`./module.json`等json文件

#### 使用
- 生成package.json文件
```sh
npm init -y
```
- 修改type属性为module
```json
{
  "type": "module"
}
```

### CommonJS和ES6 Module的区别
- CommonJS模块输出的是一个值的拷贝，ES6 Module模块输出的是值的引用
- CommonJS模块是运行时同步加载，ES6 Module模块是编译时异步输出接口
- CommonJS不可以tree shaking，ES6 Module可以tree shaking
- CommonJS模块的this指向当前模块，ES6 Module模块的this指向undefined（严格模式）



