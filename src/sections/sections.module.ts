import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Section_Controller } from './sections.controller';
import { Section_Service } from './sections.service';

import Sections from './sections.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Sections])
    ],
    controllers: [Section_Controller],
    providers: [Section_Service],
    exports: [Section_Service],
})
export class Section_Module {}