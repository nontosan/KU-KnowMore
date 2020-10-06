import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

import Blogs from './blogs.entity';

import { Blog_Service } from './blogs.service';

@Controller('blogs')
export class Blog_Controller {
  constructor(private Service: Blog_Service) {}

  @Get()
  async findAllBlogs(): Promise<Blogs[]> {
    return this.Service.findAllBlogs();
  }

  @Get(':blog_id/')
  async findBlogsID(@Param('blog_id', ParseObjectIdPipe) blog_id: ObjectID): Promise<Blogs[]> {
    return this.Service.findBlogsID(blog_id);
  }
}
