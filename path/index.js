/**
 * path 模块提供了一些工具函数，用于处理文件与目录的路径。
 *   在不同操作系统下，path模块存在差异，主要体现在以下两个方面：
 *   1. Windows系统使用\作为路径分隔符，而POSIX系统（如Linux）使用/作为路径分隔符。
 *   2. Windows系统下，文件路径可以使用\作为结束符，也可以不使用，但是POSIX系统下，文件路径不能以/结束。
 *
 *  注：windows兼容反斜杠和正斜杠
 *
 *  path.dirname(__filename) ===> 获取当前文件所在的文件夹的绝对路径
 *  path.basename(path[, ext]) 返回 path 的最后一部分
 *  path.delimiter 提供平台特定的路径定界符
 *  path.dirname(path) 返回 path 的目录名
 *  path.extname(path) 返回 path 的扩展名
 *  path.format(pathObject) 从对象返回路径字符串
 *  path.isAbsolute(path) 判断 path 是否为绝对路径
 *  path.join([...paths]) 使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径
 *  path.normalize(path) 规范化给定的 path，并解析 '..' 和 '.' 片段
 *  path.parse(path) 返回一个对象，对象的属性表示 path 的元素
 *  path.posix 提供上述 path 方法的 POSIX 特定实现
 *  path.relative(from, to) 根据当前工作目录返回 from 到 to 的相对路径
 *  path.resolve([...paths]) 把一个路径或路径片段的序列解析为一个绝对路径
 *  path.sep 提供平台特定的路径片段分隔符, windows: \, POSIX: /
 *  path.toNamespacedPath(path) 根据 path 返回一个从命名空间前缀（如果有）解析了的路径
 *  path.win32 提供上述 path 方法的 Windows 特定实现
 *
 */

const path = require('node:path')
const site = `F:\\project\\node\\foo\\bar\\baz\\asdf\\index.js\\`

console.log(path.dirname(site)) // F:\project\node\foo\bar\baz\asdf
console.log(path.basename(site)) // index.js
console.log(path.basename(site, '.js')) // index
console.log(path.delimiter) // ;
console.log(path.dirname(site)) // F:\project\node\foo\bar\baz\asdf
console.log(path.extname(site)) // .js
console.log(path.format({
    root: 'F:\\',
    dir: 'F:\\project\\node\\foo\\bar\\baz\\asdf',
    base: 'index.js',
    ext: '.js',
    name: 'index'
})) // F:\project\node\foo\bar\baz\asdf\index.js
console.log(path.isAbsolute(site)) // true
console.log(path.join('foo', 'bar', 'baz/asdf', 'quux', '..')) // foo\bar\baz\asdf
console.log(path.normalize('foo/bar//baz/asdf/quux/..')) // foo\bar\baz\asdf
console.log(path.parse(site)) // { root: 'F:\\', dir: 'F:\\project\\node\\foo\\bar\\baz\\asdf', base: 'index.js', ext: '.js', name: 'index' }
console.log(path.relative('F:\\project\\node\\foo\\bar\\baz\\asdf', 'F:\\project\\node\\foo\\bar\\baz\\asdf\\index.js')) // index.js
console.log(path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')) // F:\tmp\subfile
console.log(path.sep) // \
console.log(path.toNamespacedPath('foo/bar')) // foo/bar

