import log4js from 'log4js'

// 控制台输出，并且存在本地文件
log4js.configure({
    appenders:{
        out:{
            type:"stderr", // 控制台
            layout:{
                type:"colored" // 控制台样式
            }
        },
        file:{// 文件输出
            filename:"logs/server.log", //
            type:"file"
        }
    },
    categories:{
        default:{
            appenders:["out","file"], // 使用 out 和 file 输出器
            level:"debug" // 设置日志级别为 debug
        }
    }
})

// 获取 logger
const logger = log4js.getLogger('default');
/**
 *
 * @param req 接收前端传递数据
 * @param res 返回给前端的数据
 * @param next 是否执行下一个中间件 如果不写就一直在阻塞
 * @constructor 每个请求都会经过中间件
 */
const LoggerMiddleware = (req,res,next)=>{
    logger.debug(`${req.method} ${req.url}`); // 记录请求方法和URL
    next();
}

export default LoggerMiddleware