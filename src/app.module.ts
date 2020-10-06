import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import Blogs from './blogs/blogs.entity';

import { Blog_Module } from './blogs/blogs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      database: 'testKU',
      entities: [Blogs],
      synchronize: true,
    }),

    Blog_Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}