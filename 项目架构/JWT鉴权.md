## JWT鉴权

>JWT（JSON Web Token）是一种开放的标准（RFC 7519），用于在网络应用间传递信息的一种方式。它是一种基于JSON的安全令牌，用于在客户端和服务器之间传输信息。

(jwt.io/)[https://jwt.io/]

JWT由三部分组成，它们通过点（.）进行分隔：

- Header（头部）：包含了令牌的类型和使用的加密算法等信息。通常采用Base64编码表示。
- Payload（负载）：包含了身份验证和授权等信息，如用户ID、角色、权限等。也可以自定义其他相关信息。同样采用Base64编码表示。
- Signature（签名）：使用指定的密钥对头部和负载进行签名，以确保令牌的完整性和真实性。

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

JWT工作流程:
- 用户通过提供有效的凭证（例如用户名和密码）进行身份验证。
- 服务器验证凭证，并生成一个JWT作为响应。JWT包含了用户的身份信息和其他必要的数据。
- 服务器将JWT发送给客户端。
- 客户端在后续的请求中，将JWT放入请求的头部或其他适当的位置。
- 服务器在接收到请求时，验证JWT的签名以确保其完整性和真实性。如果验证通过，服务器使用JWT中的信息进行授权和身份验证。


使用依赖：
- passport passport是一个流行的用于身份验证和授权的Node.js库，其中不止JWT
- passport-jwt Passport-JWT是Passport库的一个插件，用于支持使用JSON Web Token (JWT) 进行身份验证和授权
- jsonwebtoken 生成token的库


- 封装
```ts
import { injectable } from 'inversify'
import jsonwebtoken from 'jsonwebtoken'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
@injectable()
export class JWT {
    private secret = 'smz$%^&*' //签名
    private jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.secret
    }
    constructor() {
        this.strategy()
    }

    /**
     * 初始化jwt
     */
    public strategy() {
        const strategy = new Strategy(this.jwtOptions, (payload, done) => {
            done(null, payload)
        })
        passport.use(strategy)
    }

    /**
     *
     * @returns
     *   用于加在接口处，用来判断哪个接口需要携带token
     */
    static middleware() {
        return passport.authenticate('jwt', { session: false })
    }

    /**
     * 创建token
     * @param data Object
     */
    public createToken(data: object) {
        //有效期为7天
        return jsonwebtoken.sign(data, this.secret, { expiresIn: '7d' }) // 过期7天
    }

    /**
     *
     * @returns 集成到express
     */
    public init() {
        return passport.initialize()
    }
}

```
- services.ts 依赖注入

```ts
constructor( // 依赖注入
    @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
@inject(JWT) private readonly jwt:JWT
) {}
```

- 在登陆接口成功后生成并返回token
```ts
token: this.jwt.createToken(result) //生成token
```

- 为需要携带token的接口添加中间件
```ts
@Get("/index",JWT.middleware()) //携带一个中间件，判断接口是否需要携带token
public async getIndex(req:Request,res:Response) {
    // controller 不做实现 在services实现业务逻辑
    // @ts-ignore
    console.log(req.user)
    let result = await this.UserService.getUserList();
    res.send(result);
}
```


