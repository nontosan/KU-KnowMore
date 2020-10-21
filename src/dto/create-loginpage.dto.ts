import { IsNotEmpty } from "class-validator";

export class CreateLoginDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password:string;
    
    token?: string;
}