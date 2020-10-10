import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Review_Controller } from './reviews.controller';
import { Review_Service } from './reviews.service';

import Reviews from './reviews.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Reviews])
    ],
    controllers: [Review_Controller],
    providers: [Review_Service],
    exports: [Review_Service],
})
export class Review_Module {}