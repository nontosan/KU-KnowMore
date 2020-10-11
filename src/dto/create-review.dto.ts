import { IsNotEmpty } from "class-validator";

export class CreateReviewsDto {

    @IsNotEmpty()
    teaching: number;

    @IsNotEmpty()
    hw: number;
    
    @IsNotEmpty()
    classroom: number;

    @IsNotEmpty()
    overall: number;

    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    blog_id: string;
}