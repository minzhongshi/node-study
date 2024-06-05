/**
 * 哈希函数
 *
 */

const crypto = require("crypto");

const secret = 'abcdefg';
const hash = crypto.createHash('sha256', secret)
    .update('SMZ')
    .digest('hex');
console.log(hash);