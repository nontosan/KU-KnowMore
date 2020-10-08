import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comments_Controller } from './comments.controller';
import { Comments_Service } from './comments.service';

import Comments from './comments.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Comments])
    ],
    controllers: [Comments_Controller],
    providers: [Comments_Service]
})
export class Comments_Module {}