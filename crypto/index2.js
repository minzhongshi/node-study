/**
 * 非对称加密算法
 *
 * 解密需要使用相同的加密算法
 */


const crypto = require("crypto");
const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa',{
    modulusLength: 2048, // 长度越长越安全 越慢
});
//加密
const encrypted = crypto.publicEncrypt(publicKey, Buffer.from('hello'));
console.log(encrypted.toString('hex'));
//解密

const decrypted = crypto.privateDecrypt(privateKey,encrypted);
console.log(decrypted.toString());
