import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import Blogs from './blogs/blogs.entity';
import Courses from './courses/courses.entity';
import Users from './users/users.entity';
import Sections from './sections/sections.entity';
import Comments from './comments/comments.entity';
import Reviews from './reviews/reviews.entity';
import Likes from './likes/likes.entity';

import { Blog_Module } from './blogs/blogs.module';
import { Course_Module } from './courses/courses.module';
import { User_Module } from './users/users.module';
import { Section_Module } from './sections/sections.module';
import { CommentsModule } from './comments/comments.module';
import { Review_Module } from './reviews/reviews.module';
import { Like_Module } from './likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '188.166.178.33',
      port: 27017,
      username: 'admin-backend',
      password: 'Rahat_Khao_Da_Ta_Bet',
      database: 'KU-KnowMore',
      entities: [Blogs, Courses, Users, Sections, Comments, Reviews, Likes],
      synchronize: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   host: 'localhost',
    //   database: 'testKU',
    //   entities: [Blogs, Courses, Users, Sections, Comments, Reviews, Likes],
    //   synchronize: true,
    // }),
    
    Blog_Module,
    Course_Module,
    User_Module,
    Section_Module,
    CommentsModule,
    Review_Module,
    Like_Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}