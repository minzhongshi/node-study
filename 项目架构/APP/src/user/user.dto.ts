import {IsNotEmpty,IsEmail} from 'class-validator'
import {Transform} from 'class-transformer'
export class UserDto {
    @IsNotEmpty({message: '用户名不能为空'})
    @Transform(( user ) => user.value.trim()) //自定义验证
    name: string

    @IsNotEmpty({message: '邮箱不能为空'})
    @IsEmail({}, {message: '邮箱格式不正确'})
    email: string
}