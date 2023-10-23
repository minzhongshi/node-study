## xmzs 

### xmzs是什么
用来管理Node版本和源等操作的命令行工具

### xmzs使用
- 安装
```sh
npm install -g xmzs
```
- 查看版本
```sh
mmp -V
```
- 查看当前源
```sh
mmp current
```
- 切换源
```sh
mmp use 
```
- 添加源
```sh
mmp add
```


## 发布npm包的作用
- 跨团队或团队共享代码，还可以进行版本控制
- 开源造轮子
- 增加自身价值体现

## 发布npm包的流程
- 查看当前源
这里需要切回官方源
```sh
npm config get registry
```

- 注册npm账号
```sh
npm adduser
```
- 登录npm账号
```sh
npm login
```
- 创建npm包
可以配置package.json中files属性，指定需要发布的文件
```json
{
  "files": [
    "index.js"
  ]
}
```
```sh
npm init
```
- 发布npm包
名称必须唯一 否则403，发布前需要修改版本号
```sh
npm publish
```
- 更新npm包
```sh
npm version patch
npm publish
```
- 删除npm包
```sh
npm unpublish
```


