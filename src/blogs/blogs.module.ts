import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Blog_Controller } from './blogs.controller';
import { Blog_Service } from './blogs.service';

import Blogs from './blogs.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Blogs])
    ],
    controllers: [Blog_Controller],
    providers: [Blog_Service]
})
export class Blog_Module {}