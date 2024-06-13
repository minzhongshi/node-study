// 引入所需的模块
import zlib from "zlib";
 // zlib 模块提供数据压缩和解压缩功能
import fs from "node:fs"; // 引入 Node.js 的 fs 模块用于文件操作

/**
 * Gzip
 */
// 创建可读流和可写流
// const readStream = fs.createReadStream('index.txt'); // 创建可读流，读取名为 index.txt 的文件
// const writeStream = fs.createWriteStream('index.txt.gz'); // 创建可写流，将压缩后的数据写入 index.txt.gz 文件

// 使用管道将可读流中的数据通过 Gzip 压缩，再通过管道传输到可写流中进行写入
//readStream.pipe(zlib.createGzip()).pipe(writeStream)

// 解压
// const readStream = fs.createReadStream('index.txt.gz')
// const writeStream = fs.createWriteStream('index2.txt')
// readStream.pipe(zlib.createGunzip()).pipe(writeStream)


/**
 * deflate
 */
// 压缩
// const readStream = fs.createReadStream('index.txt'); // 创建可读流，读取名为 index.txt 的文件
// const writeStream = fs.createWriteStream('index.txt.deflate'); // 创建可写流，将压缩后的数据写入 index.txt.deflate 文件
// readStream.pipe(zlib.createDeflate()).pipe(writeStream);

//解压
// const readStream = fs.createReadStream('index.txt.deflate')
// const writeStream = fs.createWriteStream('index3.txt')
// readStream.pipe(zlib.createInflate()).pipe(writeStream)


/**
 * http压缩
 */
import http from "node:http";


const server = http.createServer((req,res)=>{
    const txt = 'SMZ'.repeat(1000);

    res.setHeader('Content-Encoding','gzip')
    //res.setHeader('Content-Encoding','deflate')
    res.setHeader('Content-type','text/plan;charset=utf-8')

    const result = zlib.gzipSync(txt);
    //const result = zlib.deflateSync(txt);
    res.end(result)
})

server.listen(3000)