/**
 * node环境可以使用第三方库 jsdom ===> 模拟浏览器环境，可以使用BOM和DOM API
 *      安装：npm install jsdom
 *      使用：
 *        const {JSDOM} = require('jsdom')
 *        const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>')
 *        console.log(dom.window.document.querySelector('p').textContent) // "Hello world"
 *
 *  像这样在服务端完成页面渲染返回页面文件，称之为SSR ===> 服务端渲染
 *  而在浏览器端完成页面渲染，称之为CSR ===> 客户端渲染
 *
 *  CSR和SSR的区别：
 *    1. SSR首屏渲染速度快，CSR首屏渲染速度慢
 *    2. SSR对SEO友好，CSR对SEO不友好
 *    3. SSR对服务器压力大，CSR对服务器压力小
 *    4. SSR不利于前后端分离，CSR利于前后端分离
 *
 *  SEO: Search Engine Optimization ===> 搜索引擎优化
 *     TDK:meta标签 title description keywords ===> 标题 描述 关键字
 *     语义化标签
 *     内链
 *     外链
 *
 */

const {JSDOM} = require('jsdom')
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>')
console.log(dom.window.document.querySelector('p').textContent) // "Hello world"



const fs = require('node:fs')
const dom2 = new JSDOM(`<!DOCTYPE html>
<html>
<body>
<div id="app"></div>
</body>
</html>
`)
const window = dom2.window
const document = window.document
const app = document.getElementById('app')
// fetch API在 node18版本之后才支持，之前版本需要安装第三方库 node-fetch
fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1').then(res => res.json()).then(data => {
    data.forEach(item=>{
        const img =  document.createElement('img')
        img.src = item.url
        img.style.width = '200px'
        img.style.height = '200px'
        app.appendChild(img)
    })
    // writeFileSync: 同步写入文件
    fs.writeFileSync('./index.html', dom2.serialize())// 将dom2转换成字符串，写入文件
})

