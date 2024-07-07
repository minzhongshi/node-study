import {controller,httpGet as Get,httpPost as Post} from "inversify-express-utils";
import {UserService} from "./services";
import {inject} from "inversify";
import type {Request,Response} from "express";
import { JWT } from '../jwt'

/**
 * @controller 装饰器：指定处理 /user 路径下的 请求控制器
 */
@controller("/user")
export class User {
    constructor(@inject(UserService) private readonly UserService:UserService) {

    }

    /**
     * @Get 装饰器：指定 GET /index 路径的处理函数，用于获取索引信息
     */
    @Get("/index",JWT.middleware()) //携带一个中间件，判断接口是否需要携带token
    public async getIndex(req:Request,res:Response) {
        // controller 不做实现 在services实现业务逻辑
        // @ts-ignore
        console.log(req.user)
        let result = await this.UserService.getUserList();
        res.send(result);
    }

    /**
     * @Post 装饰器：指定 POST /create 路径的处理函数，用于创建用户
     */
    @Post("/create")
    public async createUser(req:Request,res:Response) {
        let result = await this.UserService.createUser(req.body);
        res.send(result);
    }
}