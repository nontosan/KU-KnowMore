import { IsNotEmpty } from 'class-validator';

export class CreateSuperUserDto {
    @IsNotEmpty()
    cn: string;
      
    @IsNotEmpty()
    uid: string;
      
    @IsNotEmpty()
    sn: string;
      
    @IsNotEmpty()
    campus: string;
      
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;
      
    @IsNotEmpty()
    thainame: string;
      
    @IsNotEmpty()
    thaiprename: string;
      
    @IsNotEmpty()
    givenname: string;
      
    @IsNotEmpty()
    faculty: string;
      
    @IsNotEmpty()
    faculty_id: string;
          
    @IsNotEmpty()
    type_person: string;

    @IsNotEmpty()
    profile_description: string;
    
    @IsNotEmpty()
    pic_name: string;
    
    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    pic_dir: string;
}
