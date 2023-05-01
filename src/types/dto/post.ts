import { IsEnum, IsString } from 'class-validator';
import { Visibility } from '../post';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsEnum(Visibility)
    visibility: Visibility;
}

export class AddCommentDto {
    @IsString()
    content: string;
}
