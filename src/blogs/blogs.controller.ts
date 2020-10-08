import { Body, Controller, Get, Param, Query, Post } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

import Blogs from './blogs.entity';

import { Blog_Service } from './blogs.service';
import { CreateBlogDto } from '../dto/create-blog.dto'

import { Course_Service } from 'src/courses/courses.service';

@Controller('blogs')
export class Blog_Controller {
  constructor(private Service: Blog_Service, private courseService: Course_Service) {}

  @Get()
  async findAllBlogs(): Promise<Blogs[]> {
    console.log(this.Service.getDate());
    return this.Service.findAllBlogs();
  }
  
  @Get('search')
  async findBlogsIDSearch(@Query() query): Promise<Blogs[]> {
    const keys = Object.keys(query);
    const pairs = Object.entries(query);
    const Obj = {};
    for (var i of keys) {
      var value = pairs.find(element => element[0] == i)[1];
      Object.assign(Obj, i === "type" ? {type:value} : {});
      Object.assign(Obj, i === "code" ? {code:value} : {});
      Object.assign(Obj, i === "name" ? {name:value} : {});
    }
    return this.Service.findAllBlogsSearch(Obj);
  }

  @Get('/:blog_id')
  async findBlogsID(@Param('blog_id', ParseObjectIdPipe) blog_id: ObjectID): Promise<Blogs[]> {
    return this.Service.findBlogsID(blog_id);
  }

  @Post()
  async create(@Body() create: CreateBlogDto) {
    create.viewers = 0;
    create.last_edit = this.Service.getDate();
    const newBlog = this.Service.createBlog(create);
    return newBlog;
  }
}