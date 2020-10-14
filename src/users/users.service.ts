import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Users from './users.entity';
import {CreateUserDto} from '../dto/create-users.dto';

@Injectable()
export class User_Service {
    constructor(
        @InjectRepository(Users)
        private User_Repository: Repository<Users>,
    ) {}

    async findAllUsers() : Promise<Users[]> {  
        return this.User_Repository.find();
    }
    async findUsersID(blog_id: ObjectID): Promise<Users[]> {
        return this.User_Repository.find({where: { _id: blog_id }});
    }
    async create(createUserDto: CreateUserDto) {
        return this.User_Repository.save(createUserDto);
    }
    async updateUser(user_id: string, updateUser: Users) {
        return this.User_Repository.update(user_id, updateUser);
    }

}