## 简介

提供了加密和哈希算法，都以c/c++编写，通过JS调用。

## 对称加密
双方协定密钥和iv，通过相同的密钥进行加解密。


初始化向量并不会加密，但需要不可预估。

- 加密

```javascript
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

```
- 解密
```javascript
const  de = crypto.createDecipheriv(
    "aes-256-cbc",
    secret,
    Buffer.alloc(16, 0)
);

de.update(result,"hex","utf-8");
console.log(de.final("utf-8"));
```

## 非对称加密

生成公钥和私钥，私钥只能管理员拥有 不能公开，公钥位公开。

crypto.generateKeyPairSync(type, options)方法共有两个参数。

- type 为加密算法
  type: <string> 必须是 'rsa'、'dsa'、'ec'、'ed25519'、'ed448'、'x25519'、'x448' 或 'dh'。
- options 为加密配置信息
  options: <Object>
  modulusLength: <number> 以位为单位的密钥大小（RSA、DSA）。
  publicExponent: <number> 公共指数 (RSA)。 默认值: 0x10001。
  divisorLength: <number> q 的比特大小 (DSA)。
  namedCurve: <string> 要使用的曲线名称 (EC)。
  prime: <Buffer> 素数参数 (DH)。
  primeLength: <number> 以比特为单位的质数长度 (DH)。
  generator: <number> 自定义生成器 (DH)。 默认值: 2。
  groupName: <string> Diffie-Hellman 组名 (DH)。 参见 crypto.getDiffieHellman()。
  publicKeyEncoding: <Object> 参见 keyObject.export()。
  privateKeyEncoding: <Object> 参见 keyObject.export()。


返回一个对象 <Object>

- publicKey: <string> | <Buffer> | <KeyObject>
- privateKey: <string> | <Buffer> | <KeyObject>


成给定 type 的新非对称密钥对。 目前支持 RSA、DSA、EC、Ed25519、Ed448、X25519、X448 和 DH。

如果指定了 publicKeyEncoding 或 privateKeyEncoding，则此函数的行为就像对其结果调用了 keyObject.export()。 否则，密钥的相应部分将作为 KeyObject 返回。

对公钥进行编码时，建议使用'spki'。 对私钥进行编码时，建议使用强密码的'pkcs8'，并对密码进行保密。

```javascript
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
```


## 哈希函数

哈希函数不能被解密，不可逆的。

哈希函数不一定安全。它具有唯一性。撞库去找密码。

### 应用场景：
 
-  文件的一致性，当前端读取文件转换成哈希值，上传给服务端，服务端也进行哈希加密，如果两次哈希值一直，则文件没问题。
