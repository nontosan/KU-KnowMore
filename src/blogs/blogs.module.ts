import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Blog_Controller } from './blogs.controller';
import { Blog_Service } from './blogs.service';

import Blogs from './blogs.entity';
import { Section_Service } from 'src/sections/sections.service';
import { Section_Module } from 'src/sections/sections.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Blogs]),
        Section_Module,
    ],
    controllers: [Blog_Controller],
    providers: [Blog_Service]
})
export class Blog_Module {}