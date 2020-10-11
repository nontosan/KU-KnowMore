import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Like_Controller } from './likes.controller';
import { Like_Service } from './likes.service';

import Likes from './likes.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Likes]),
    ],
    controllers: [Like_Controller],
    providers: [Like_Service],
    exports: [Like_Service],
})
export class Like_Module {}