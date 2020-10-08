import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import Blogs from './blogs/blogs.entity';
import Users from './users/users.entity';
import { Blog_Module } from './blogs/blogs.module';
import { User_Module } from './users/users.module';
import { Comments_Module } from './comments/comments.module'
import Comments from './comments/comments.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '188.166.178.33',
      port: 27017,
      database: 'KU-KnowMore',
      entities: [Blogs, Users,Comments],
      synchronize: true,
    }),
    Blog_Module,
    User_Module,
    Comments_Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}