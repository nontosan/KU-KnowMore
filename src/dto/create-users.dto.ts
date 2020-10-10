import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    profile_description: string;
    
    @IsNotEmpty()
    pic_name: string;
    
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    pic_dir: string;
}
