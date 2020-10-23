import { Body, Controller, Get, Param, Query, Post } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

import Courses from './courses.entity';

import { Course_Service } from './courses.service';

//import { CreateCourseDto } from '../dto/create-courses.dto';

@Controller('courses')
export class Course_Controller {
  constructor(private Service: Course_Service) {}

  @Get()
  async findAllCourses(): Promise<Courses[]> {
    return this.Service.findAllCourses();
  }
  @Get('search')
  async Search(@Query() query): Promise<Courses[]> {
    const keys = Object.keys(query);
    const pairs = Object.entries(query);
    const Obj = {};
    for (var i of keys) {
      var value = pairs.find(element => element[0] == i)[1];
      Object.assign(Obj, i === "code" ? {Code:value} : {});
      Object.assign(Obj, i === "nameTh" ? {NameTh:value} : {});
      Object.assign(Obj, i === "nameEn" ? {NameEn:value} : {});
      Object.assign(Obj, i === "teacher" ? {Teacher:value} : {});
    }
    return this.Service.Search(Obj);
  }
  /*
  @Post()
  async add() {
    return this.Service.add();
  }*/
}