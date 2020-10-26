import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Delete, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import Sections from './sections.entity';
import Attachments from '../attachments/attachments.entity';
import { Section_Service } from './sections.service';
import { Attachment_Service } from '../attachments/attachments.service';

import { CreateSectionDto } from 'src/dto/create-section.dto';
import { CreateAttachmentDto } from '../dto/create-attachment.dto';

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

@Controller('Sections')
export class Section_Controller {
  constructor(private Service: Section_Service,
              private attachmentService: Attachment_Service,) {}

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

  @Post('/:Section_id/attachments')
  @UseInterceptors(FilesInterceptor('attachments', 25, { storage: diskStorage({ destination: './attachments', filename: editFileName }) }))
  async createAttachment(@Param('Section_id') section_id: string, @UploadedFiles() attachments): Promise<Attachments[]> {
    return this.attachmentService.create(attachments, section_id);
  }

  @Put('/:Section_id')
  async updateSection(@Param('Section_id') Section_id: string, @Body() updateSection: Sections) {
    return this.Service.update(Section_id, updateSection);
  }

  @Delete('/:section_id')
  async deleteSection(@Param('section_id') section_id: string) {
    return this.Service.delete(section_id);
  }
  @Get('/:section_id/attachments')
  async findAttachmentSection(@Param('section_id') section_id: string): Promise<Attachments[]> {
    return this.attachmentService.findAttachmentSection(section_id);
  }


}
