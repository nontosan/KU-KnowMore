import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import Blogs from './blogs/blogs.entity';
import Courses from './courses/courses.entity';

import { Blog_Module } from './blogs/blogs.module';
import { Course_Module } from './courses/courses.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'testKU',
      entities: [Blogs,Courses],
      synchronize: true,
    }),

    Blog_Module, Course_Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}