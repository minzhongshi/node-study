import {inject, injectable} from "inversify";
import {PrismaDB} from "../db";
import {UserDto} from "./user.dto";
import {plainToClass} from "class-transformer";
import {validate}from "class-validator";
import {JWT} from "../jwt";

// 导出一个名为 UserService 的可注入类
@injectable()
export class UserService {
    constructor( // 依赖注入
        @inject(PrismaDB) private readonly PrismaDB: PrismaDB,
        @inject(JWT) private readonly jwt:JWT
    ) {}

    /**
     * 获取一个用户对象
     * @public
     * @return {Object} 一个用户对象，包含 name 和 age 属性
     */
    public async getUserList() {
        return await this.PrismaDB.prisma.user.findMany();
    }

    /**
     * 创建一个新用户到数据库
     *
     * @param user - 要创建的用户数据
     * @returns 创建成功的用户数据
     */
    public async createUser(user:UserDto) {
        /**
         * 入库
         */
        let userDto = plainToClass(UserDto,user); // 参数映射
        const errors = await validate(userDto);
        if (errors.length) {
            return errors;
        }else {
            let result =await this.PrismaDB.prisma.user.create({
                data: user
            });
            return {
                ...result,
                token: this.jwt.createToken(result) //生成token
            }
        }
    }
}