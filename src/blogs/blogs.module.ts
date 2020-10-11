import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Blog_Controller } from './blogs.controller';
import { Blog_Service } from './blogs.service';

import Blogs from './blogs.entity';

import { Course_Module } from '../courses/courses.module';
import { Section_Module } from 'src/sections/sections.module';
import { Review_Module } from 'src/reviews/reviews.module';
import { Like_Module } from 'src/likes/likes.module';
import { CommentsModule } from 'src/comments/comments.module';
import { Report_Module } from 'src/reports/reports.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Blogs]),
        Course_Module,
        Section_Module,
        Review_Module,
        Like_Module,
        CommentsModule,
        Report_Module,
    ],
    controllers: [Blog_Controller],
    providers: [Blog_Service],
})
export class Blog_Module {}