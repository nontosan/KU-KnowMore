import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

import Users from './comments.entity';

import { Comments_Service } from './comments.service';

@Controller('comments')
export class Comments_Controller {
  constructor(private Service: Comments_Service) {}

  @Get()
  async findAllUsers(): Promise<Users[]> {
    return this.Service.findAllUsers();
  }
  
  @Get('/:user_id')
  async findUsersID(@Param('user_id', ParseObjectIdPipe) user_id: ObjectID): Promise<Users[]> {
    return this.Service.findUsersID(user_id);
  }

}
