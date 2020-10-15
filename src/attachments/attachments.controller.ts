import { Body, Controller, Get,Delete, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

import Attachments from './attachments.entity';

import { Attachment_Service } from './attachments.service';

@Controller('attachments')
export class Attachment_Controller {
    constructor(private Service: Attachment_Service) {}
  
  @Get()
  async findAll(): Promise<Attachments[]> {
    return this.Service.findAll();
  }

  @Get('/:atm_id')
  async findCommentsID(@Param('atm_id', ParseObjectIdPipe) atm_id: ObjectID): Promise<Attachments[]> {
    return this.Service.find(atm_id);
  }
  /*
  @Post()
  async create(@Body() createCommentsDto: CreateCommentsDto) {
    createCommentsDto.date_time = this.Service.getDate();
    const newComment = this.Service.create(createCommentsDto);
    return newComment;
  }*/

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.Service.delete(id);
  }

}