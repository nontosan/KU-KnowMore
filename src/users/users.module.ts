import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { User_Controller } from './users.controller';
import { User_Service } from './users.service';

import Users from './users.entity';
import { Blog_Module } from 'src/blogs/blogs.module';
import { Like_Module } from 'src/likes/likes.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users]),
        MulterModule.register({ dest: './profile_pic' }),
        Blog_Module,
        Like_Module
    ],
    controllers: [User_Controller],
    providers: [User_Service],
    exports: [User_Service]
})
export class User_Module {}