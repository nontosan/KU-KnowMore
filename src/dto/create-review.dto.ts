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

    blog_id?: string;
}