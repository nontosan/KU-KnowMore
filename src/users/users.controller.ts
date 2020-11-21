import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import Users from './users.entity';

import { CreateUserDto } from '../dto/create-users.dto';
import { User_Service } from './users.service';

const editFileName = (req, file, callback) => {
  const original = file.originalname;
  const name = original.split('.')[0];
  const extIndex = original.split('.').length - 1;
  const fileExtName =(original.split('.')[extIndex]);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}_${randomName}.${fileExtName}`);
};

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

  @Get('/:user_id/hours')
  async findUserHours(@Param('user_id') user_id: string) {
    return this.Service.hours_calculate(user_id);
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createuserDto: CreateUserDto): Promise<Users> {
    return this.Service.create(createuserDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/:user_id/profile_pic')
  @UseInterceptors(FileInterceptor('profile_pic', { storage: diskStorage({ destination: './profile_pic', filename: editFileName }) }))
  async uploadProfilePic(@Param('user_id', ParseObjectIdPipe) user_id: ObjectID, @UploadedFile() profile_pic): Promise<Users[]> {
    var uploadUserProfile = {
      "pic_dir": profile_pic.path,
      "pic_name": profile_pic.filename
    };
    return this.Service.uploadUserProfilePic(user_id, uploadUserProfile);
  }

  // @UseGuards(JwtAuthGuard)
  @Put('/:user_id')
  async updateUsers(@Param('user_id') user_id: string, @Body() updateUser: Users) {
    return this.Service.updateUser(user_id, updateUser);
  }

}
