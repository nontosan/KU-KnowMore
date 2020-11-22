import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import Blogs from './blogs/blogs.entity';
import Recycle_blogs from './blogs/recycle.entity';
import Courses from './courses/courses.entity';
import Users from './users/users.entity';
import Sections from './sections/sections.entity';
import Comments from './comments/comments.entity';
import Reviews from './reviews/reviews.entity';
import Likes from './likes/likes.entity';
import Reports from './reports/reports.entity';
import Attachments from './attachments/attachments.entity';

import { Blog_Module } from './blogs/blogs.module';
import { Course_Module } from './courses/courses.module';
import { User_Module } from './users/users.module';
import { Section_Module } from './sections/sections.module';
import { CommentsModule } from './comments/comments.module';
import { Review_Module } from './reviews/reviews.module';
import { Like_Module } from './likes/likes.module';
import { Report_Module } from './reports/reports.module';
import { Attachment_Module } from './attachments/attachments.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'mongo.ku-knowmore.xyz',  //For Test in local
      // host: '172.17.0.2',          //For Deploy
      username: 'admin-backend',
      password: 'Rahat_Khao_Da_Ta_Bet',
      database: 'KU-KnowMore',
      entities: [Blogs, Courses, Users, Sections, Comments, Reviews, Likes, Reports, Attachments, Recycle_blogs],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
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
    Report_Module,
    Attachment_Module,
    AuthModule,
    HttpModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}