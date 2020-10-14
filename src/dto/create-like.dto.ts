import { IsNotEmpty } from "class-validator";

export class CreateLikeDto {
    @IsNotEmpty()
    user_id: string;

    blog_id?: string;
}