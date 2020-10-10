import { IsNotEmpty } from "class-validator";

export class CreateCommentsDto{
    @IsNotEmpty()
    blog_id: string;
    @IsNotEmpty()
    user_id: string;
    @IsNotEmpty()
    content: string
    
    @IsNotEmpty()
    date_time: string;
}