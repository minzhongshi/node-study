import nodemailder from 'nodemailer'
import yaml from 'js-yaml'
import fs from 'node:fs'
import http from 'node:http'
import url from 'node:url'

const mailConfig = yaml.load(fs.readFileSync('./mail.yaml', 'utf8'))

//初始化
const transPort = nodemailder.createTransport({
    service: "qq",
    port: 465, //465 或 587
    host: 'smtp.qq.com',
    secure: true, // https
    auth: {
        pass: mailConfig.pass, //密码 | 授权码
        user: mailConfig.user //密码
    }
})


http.createServer((req, res) => {
    const { pathname } = url.parse(req.url)
    if (req.method === 'POST' && pathname == '/send/mail') {
        let mailInfo = ''
        req.on('data', (chunk) => {
            mailInfo += chunk.toString()
        })
        req.on('end', () => {
            const body = JSON.parse(mailInfo)
            // 发送
            transPort.sendMail({
                to: body.to, //收件人
                from: mailConfig.user, //发件人
                subject: body.subject,// 主题
                text: body.text// 内容
            })
            res.end('ok')
        })
    }
}).listen(3000)

