import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Users from './comments.entity';

@Injectable()
export class Comments_Service {
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

}