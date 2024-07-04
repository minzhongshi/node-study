import {inject, injectable} from "inversify";
import {PrismaDB} from "../db";

@injectable()
// 导出一个名为 UserService 的可注入类
export class UserService {
    constructor(@inject(PrismaDB) private readonly PrismaDB: PrismaDB) {

    }

    /**
     * 获取一个用户对象
     * @public
     * @return {Object} 一个用户对象，包含 name 和 age 属性
     */
    public getUser() {
        return {
            name: "zhangsan",
            age: 18
        };
    }

    /**
     * 创建一个新用户到数据库
     *
     * @param user - 要创建的用户数据
     * @returns 创建成功的用户数据
     */
    public async createUser(user:any) {
        /**
         * 入库
         */
        return await this.PrismaDB.prisma.user.create({
            data: user
        })
    }
}