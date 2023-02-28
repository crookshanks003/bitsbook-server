import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { Role } from '../../types/user';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(6)
    password: string;

    @IsString()
    @IsEnum(Role)
    role: Role;
}
