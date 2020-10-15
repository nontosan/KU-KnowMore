import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Delete } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

import Sections from './sections.entity';

import { Section_Service } from './sections.service';
import { Attachment_Service } from '../attachments/attachments.service';
import { CreateSectionDto } from 'src/dto/create-section.dto';

@Controller('Sections')
export class Section_Controller {
  constructor(private Service: Section_Service,
              private attachmentService: Attachment_Service) {}

  @Get()
  async findAllSections(): Promise<Sections[]> {
    return this.Service.findAllSections();
  }
  
  @Get('/:Section_id')
  async findSectionsID(@Param('Section_id', ParseObjectIdPipe) Section_id: ObjectID): Promise<Sections[]> {
    return this.Service.findSectionsID(Section_id);
  }
/*
  @Post()
  async createSection(@Body() createSection: CreateSectionDto) {
    var newCreateSection: CreateSectionDto = {
      "blog_id"
    };
    return this.Service.createSections(createSection);
  }*/

  @Put('/:Section_id')
  async updateSection(@Param('Section_id') Section_id: string, @Body() updateSection: Sections) {
    return this.Service.update(Section_id, updateSection);
  }

  @Delete('/:section_id')
  async deleteSection(@Param('section_id') section_id: string) {
    return this.Service.delete(section_id);
  }

}
