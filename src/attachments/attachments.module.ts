import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Attachment_Controller }  from './attachments.controller';
import { Attachment_Service } from './attachments.service';

import Attachments from './attachments.entity';

@Module({
    imports: [
      TypeOrmModule.forFeature([Attachments]),
      ],
  controllers: [Attachment_Controller],
  providers: [Attachment_Service],
  exports: [Attachment_Service]
})
export class Attachment_Module {}
