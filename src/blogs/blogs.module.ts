import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Blog_Controller } from './blogs.controller';
import { Blog_Service } from './blogs.service';

import Blogs from './blogs.entity';

import { Course_Module } from '../courses/courses.module';
import { Section_Module } from 'src/sections/sections.module';
import { Review_Module } from 'src/reviews/reviews.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Blogs]),
        Course_Module,
        Section_Module,
        Review_Module,
    ],
    controllers: [Blog_Controller],
    providers: [Blog_Service]
})
export class Blog_Module {}