import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User_Controller } from './users.controller';
import { User_Service } from './users.service';

import Users from './users.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Users])
    ],
    controllers: [User_Controller],
    providers: [User_Service]
})
export class User_Module {}