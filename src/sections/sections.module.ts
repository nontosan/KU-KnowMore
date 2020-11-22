import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { Section_Controller } from './sections.controller';
import { Section_Service } from './sections.service';

import Sections from './sections.entity';
import { Attachment_Module } from 'src/attachments/attachments.module';
import { recycleSections } from './recyclesection.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Sections,recycleSections]),
        Attachment_Module
    ],
    controllers: [Section_Controller],
    providers: [Section_Service],
    exports: [Section_Service],
})
export class Section_Module {}