import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Delete } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

import LoginPage from './loginpage.entity';

import { LoginPage_Service } from './loginpage.service';
import { CreateLoginDto } from '../dto/create-loginpage.dto';
@Controller('login')
export class LoginPage_Controller {
  constructor(private Service: LoginPage_Service) {}
  @Post()
  async create(@Body() CreateLoginDto: CreateLoginDto) {
    const newLoginPage = this.Service.createLogin(CreateLoginDto);
    return newLoginPage;
  }

}
