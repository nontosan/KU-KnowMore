import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
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
  async create(@Body() createuserDto: CreateUserDto) {
    const newComment = this.Service.create(createuserDto);
    return newComment;
  }

}
