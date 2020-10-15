import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

import Users from './users.entity';
import { CreateUserDto } from '../dto/create-users.dto';
import { User_Service } from './users.service';

@Controller('users')
export class User_Controller {
  constructor(private Service: User_Service) {}

  @Get()
  async findAllUsers(): Promise<Users[]> {
    return this.Service.findAllUsers();
  }
  
  @Get('/:user_id')
  async findUsersID(@Param('user_id', ParseObjectIdPipe) user_id: ObjectID): Promise<Users[]> {
    return this.Service.findUsersID(user_id);
  }
  
  @Post()
  @UseInterceptors(FileInterceptor('profile_pic'))
  async create(@Body() createuserDto: CreateUserDto, @UploadedFile() profile_pic) {
    var newCreateUserDto: CreateUserDto = {
      "name": createuserDto.name,
      "pic_dir":profile_pic.path,
      "pic_name": profile_pic.filename,
      "profile_description": createuserDto.profile_description,
      "username": createuserDto.username
    };
    return this.Service.create(newCreateUserDto);
  }
  
  @Put('/:user_id')
  async updateUsers(@Param('user_id') user_id: string, @Body() updateUser: Users) {
    return this.Service.updateUser(user_id, updateUser);
  }

}
