import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { LoginPage_Controller } from './loginpage.controller';
import { LoginPage_Service } from './loginpage.service';

import LoginPage from './loginpage.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([LoginPage])
    ],
    controllers: [LoginPage_Controller],
    providers: [LoginPage_Service]
})
export class LoginPage_Module {}