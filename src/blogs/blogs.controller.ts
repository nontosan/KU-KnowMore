import { Body, Controller, Get, HttpException, HttpStatus, Param, Query, Post } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { pairs } from 'rxjs';
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

  @Get('filter')
  async findBlogsIDFilter(@Query() query): Promise<Blogs[]> {
    const keys = Object.keys(query);
    const pairs = Object.entries(query);
    const Obj = {};
    for (var i of keys) {
      var value = pairs.find(element => element[0] == i)[1];
      Object.assign(Obj, i === "type" ? {type:value} : {});
      Object.assign(Obj, i === "code" ? {code:value} : {});
      Object.assign(Obj, i === "name" ? {name:value} : {});
      //console.log(i);
    }
    //console.log(Obj);
    return this.Service.findAllBlogsFilter(Obj);
  }

  @Get('/:blog_id')
  async findBlogsID(@Param('blog_id', ParseObjectIdPipe) blog_id: ObjectID): Promise<Blogs[]> {
    return this.Service.findBlogsID(blog_id);
  }

}
