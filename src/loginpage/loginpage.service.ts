import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import loginpage from './loginpage.entity';
import { CreateLoginDto } from '../dto/create-loginpage.dto';

@Injectable()
export class LoginPage_Service {
    constructor(
        @InjectRepository(loginpage)
        private Report_Repository: Repository<loginpage>,
    ) {}
    async createLogin(loginpage: CreateLoginDto) {
        return this.Report_Repository.save(loginpage);
    }
}