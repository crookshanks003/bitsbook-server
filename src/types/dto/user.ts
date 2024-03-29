import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Role } from '../user';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(6)
    password: string;

    @IsOptional()
    @IsString()
    @IsEnum(Role)
    role: Role;
}

export class UpdateUserRoleDto {
    @IsString()
    userId: string;

    @IsString()
    @IsEnum(Role)
    role: Role;
}

export class UpdateClubMemberDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsOptional()
    clubId?: string;

    @IsString()
    @IsOptional()
    role?: string;
}
