/**
 * util.promisify
 *  1. 将回调函数转换成promise
 *  2. 如果回调函数有多个参数，resolve会将参数组成一个对象返回，一个参数就直接返回
 *  3. 如果回调函数有多个参数，reject会将参数组成一个对象返回，一个参数就直接返回
 * 使用：
 *  ESM：
 *  1. import util from 'node:util';
 *  2. import { exec } from 'node:child_process';
 *  3. const execPromise = util.promisify(exec);
 *  CommonJS：
 *  1. const util = require('util');
 *  2. const exec = require('child_process').exec;
 *  3. const execPromise = util.promisify(exec);
 *
 * callbackify
 *  1. 将promise转换成回调函数
 *  2. 如果promise有多个参数，resolve会将参数组成一个对象返回，一个参数就直接返回
 *  3. 如果promise有多个参数，reject会将参数组成一个对象返回，一个参数就直接返回
 *  使用：
 *   ESM：
 *   1. import util from 'node:util';
 *   2. const fn = util.callbackify(async () => {
 *       return 'hello world';
 *       })
 *       fn((err, data) => {
 *       console.log(err, data)
 *       })
 *   CommonJS：
 *   1. const util = require('util');
 *   2. const fn = util.callbackify(async () => {
 *    return 'hello world';
 *    })
 *    fn((err, data) => {
 *    console.log(err, data)
 *    })
 *
 * format
 *  1. 格式化字符串
 *  使用：
 *   ESM：
 *    1. import util from 'node:util';
 *    2. const str = util.format('%s:%s', 'foo');
 *    3. console.log(str);
 *   CommonJS：
 *    1. const util = require('util');
 *    2. const str = util.format('%s:%s', 'foo');
 *    3. console.log(str);
 *   对应关系：
 *    %s - String.
 *    %d - Number (整型或浮点值).
 *    %j - JSON.
 *    % - 单百分号('%')。这并不消耗参数。
 *   注：
 *    如果占位符没有对应的参数，则占位符不被替换。
 *    如果要打印%需要使用%%。
 *
 */

import util from 'node:util';
import { exec } from 'node:child_process';
const execPromise = util.promisify(exec); // 返回一个新的函数，这个函数返回一个promise，将回调函数转换成promise

// 如果返回多个参数resolve会将参数组成一个对象返回，一个参数就直接返回
execPromise('node -v').then(res => {
    console.log(res) // { stdout: 'v20.5.0\r\n', stderr: '' }
}).catch(err => {
    console.log(err)
})

//promisify底层实现，拿不到stdout和stderr的key名称，因为内部使用的是Symbol，拿这个key的名称的方法没有暴露出来。
const promisify = (fn) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, (err, ...data) => {
                if (err) reject(err);
                if (data && data.length > 1){
                    let obj = {};
                    for (let i = 0; i < data.length; i++) {
                        obj[i] = data[i];
                    }
                    resolve(obj);
                }else {
                    resolve(data);
                }
            })
        })
    }
}
promisify(exec)('node -v').then(res => {
    console.log(res) // { '0': 'v20.5.0\r\n', '1': '' }
}).catch(err => {
    console.log(err)
})


// callbackify
const fn = (type) => {
    if (type === 1) {
        return Promise.resolve('hello world')
    } else {
        return Promise.reject('error')
    }
}
const callback = util.callbackify(fn)
callback(1,(err, data) => {
    console.log(err, data)
})

// callbackify底层实现
const callbackify = (fn) => {
    return (...args) => {
        const callback = args.pop();// 取出回调函数
        fn(...args).then(res => {
            callback(null, res)
        }).catch(err => {
            callback(err)
        })
    }
}
const callback1 = callbackify(fn)
callback1(1,(err, data) => {
    console.log(err, data)
})

// format
const str = util.format('%s:%s', 'foo');
console.log(str); // foo:%s
const str1 = util.format('%s:%s', 'foo', 'bar');
console.log(str1); // foo:bar
const str2 = util.format(1, 2, 3);
console.log(str2); // 1 2 3
const str3 = util.format('%s:%s', 'foo', 'bar', 'baz');
console.log(str3); // foo:bar baz
const str4 = util.format('%s:%s', 'foo');
console.log(str4); // foo:%s
