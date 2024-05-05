process.on('message', (msg) => {
    console.log(msg)
    process.send('我是子进程，我收到了你的消息')
})

process.send('我是子进程，向你发送消息')