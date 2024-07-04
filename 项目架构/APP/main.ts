import "reflect-metadata";
import {InversifyExpressServer} from "inversify-express-utils";
import {Container} from "inversify";
import {UserService} from "./src/user/services";
import {User} from "./src/user/controller";
import express from "express";
import {PrismaClient} from "@prisma/client";
import {PrismaDB} from "./src/db";

const container = new Container(); //Ioc容器
/**
 * user模块 注入容器
 */
container.bind<UserService>("UserService").to(UserService);
container.bind<User>("User").to(User);
/**
 * 封装prisma
 */
container.bind<PrismaClient>("PrismaClient").toFactory(()=>{
    return ()=> {
        return new PrismaClient();
    }
});
container.bind("PrismaDB").to(PrismaDB)


const server = new InversifyExpressServer(container);
server.setConfig(app => { // 中间件
    app.use(express.json());
});
const app = server.build();

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});