/**
 * 对称加密算法
 * 共有三个参数
 *   1.algorithm 接受一个算法 如：aes-256-cbc
 *   2.key 密钥 32位
 *   3.iv 初始化向量 支持16位 保证生成密钥串每次不一样，密钥串缺少位数自动补满
 *
 * 解密需要使用相同的加密算法
 */


const crypto = require("crypto");

const secret = crypto.randomBytes(32); // 密钥
const content = "hello world!"; // 要加密的明文

const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    secret,
    Buffer.alloc(16, 0)
);
cipher.update(content, "utf8");
// 加密后的结果：e2a927165757acc609a89c093d8e3af5

const result = cipher.final("hex") // 输出密文16进制

console.log(result);

const  de = crypto.createDecipheriv(
    "aes-256-cbc",
    secret,
    Buffer.alloc(16, 0)
);

de.update(result,"hex","utf-8");
console.log(de.final("utf-8"));