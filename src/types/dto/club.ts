import { IsString, Length } from 'class-validator';

export class CreateClubDto {
    @IsString()
    name: string;

    @IsString()
    userName: string;

    @IsString()
    @Length(6)
    password: string;

    @IsString()
    @Length(0, 255)
    description: string;
}
