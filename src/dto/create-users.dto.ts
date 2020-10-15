import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    profile_description: string;
    
    pic_name?: string;
    
    @IsNotEmpty()
    username: string;
    
    pic_dir?: string;
}
