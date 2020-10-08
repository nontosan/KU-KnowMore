import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Course_Controller } from './courses.controller';
import { Course_Service } from './courses.service';

import Courses from './courses.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Courses])
    ],
    controllers: [Course_Controller],
    providers: [Course_Service],
    exports: [Course_Service],
})
export class Course_Module {}