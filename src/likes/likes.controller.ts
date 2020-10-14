import { Body, Controller, Get, Param, Query, Post } from '@nestjs/common';
import { CreateLikeDto } from 'src/dto/create-like.dto';

import Likes from './likes.entity';

import { Like_Service } from './likes.service';

@Controller('likes')
export class Like_Controller {
  constructor(private Service: Like_Service) {}
  
  @Get('/:blog_id')
  async getAllLikesFromBlog(@Param('blog_id') blog_id: string): Promise<Likes[]> {
    console.log(blog_id)
    return this.Service.getAllLikesFromBlog(blog_id);
  }

  @Get('/user/:user_id')
  async getAllLikesFromUser(@Param('user_id') user_id: string): Promise<Likes[]> {
    return this.Service.getAllLikesFromUser(user_id);
  }
}