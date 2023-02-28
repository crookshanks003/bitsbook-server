import { IsOptional, IsString, Length } from 'class-validator';

export class CreateClubDto {
    @IsString()
    name: string;

    @IsString()
    @Length(3, 25)
    userName: string;

    @IsString()
    @Length(6)
    password: string;

    @IsString()
    @Length(0, 255)
    description: string;
}

export class UpdateClubDto {
    @IsOptional()
    @IsString()
    @Length(3, 25)
    userName?: string;

    @IsOptional()
    @IsString()
    @Length(0, 255)
    description?: string;
}
