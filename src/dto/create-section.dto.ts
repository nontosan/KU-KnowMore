import { IsNotEmpty } from "class-validator";

export class CreateSectionDto {
    @IsNotEmpty()
    section_name: string;

    //@IsNotEmpty()
    content?: string;
    
    blog_id?: string;
}