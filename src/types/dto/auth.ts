import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class ClubLoginDto {
    @IsString()
    userName: string;

    @IsString()
    password: string;
}
