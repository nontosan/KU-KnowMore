import { Body, Controller, Get, Param, Query, Post } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

import Courses from './courses.entity';

import { Course_Service } from './courses.service';

@Controller('courses')
export class Course_Controller {
  constructor(private Service: Course_Service) {}

  @Get()
  async findAllCourses(): Promise<Courses[]> {
    return this.Service.findAllCourses();
  }
}