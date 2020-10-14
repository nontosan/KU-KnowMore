import { IsNotEmpty } from "class-validator";

export class CreateCommentsDto{
    blog_id?: string;

    @IsNotEmpty()
    user_id: string;
    
    @IsNotEmpty()
    content: string
    
    date_time?: string;
}