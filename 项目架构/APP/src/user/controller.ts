import {controller,httpGet as Get,httpPost as Post} from "inversify-express-utils";
import {UserService} from "./services";
import {inject} from "inversify";
import type {Request,Response} from "express";

/**
 * @controller 装饰器：指定处理 /user 路径下的 请求控制器
 */
@controller("/user")
export class User {
    constructor(@inject("UserService") private readonly userService:UserService) {

    }

    /**
     * @Get 装饰器：指定 GET /index 路径的处理函数，用于获取索引信息
     */
    @Get("/index")
    public getIndex(req:Request,res:Response) {
        // controller 不做实现 在services实现业务逻辑
        let result = this.userService.getUser();
        res.send(result);
    }

    /**
     * @Post 装饰器：指定 POST /create 路径的处理函数，用于创建用户
     */
    @Post("/create")
    public async createUser(req:Request,res:Response) {
        let result = await this.userService.createUser(req.body);
        console.log(req.body)
        res.send(result);
    }
}