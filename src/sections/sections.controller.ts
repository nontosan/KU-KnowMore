import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import Blogs from 'src/blogs/blogs.entity';
import { ParseObjectIdPipe } from '../common/pipes';

import Sections from './sections.entity';

import { Section_Service } from './sections.service';

@Controller('Sections')
export class Section_Controller {
  constructor(private Service: Section_Service) {}

  @Get()
  async findAllSections(): Promise<Sections[]> {
    return this.Service.findAllSections();
  }
  
  @Get('/:Section_id')
  async findSectionsID(@Param('Section_id', ParseObjectIdPipe) Section_id: ObjectID): Promise<Sections[]> {
    return this.Service.findSectionsID(Section_id);
  }

}
