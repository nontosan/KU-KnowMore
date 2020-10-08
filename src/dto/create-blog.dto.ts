import { IsNotEmpty } from "class-validator";

export class CreateBlogDto {
    @IsNotEmpty()
    course_id: string;

    @IsNotEmpty()
    user_id: string;

    @IsNotEmpty()
    type: string;

    viewers?: number;

    @IsNotEmpty()
    blog_name: string;

    last_edit?: string;
}