import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Report_Controller } from './reports.controller';
import { Report_Service } from './reports.service';

import Reports from './reports.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Reports])
    ],
    controllers: [Report_Controller],
    providers: [Report_Service],
    exports: [Report_Service],
})
export class Report_Module {}