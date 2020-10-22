import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Users from './users.entity';
import {CreateUserDto} from '../dto/create-users.dto';

export type User = any;

@Injectable()
export class User_Service {
    private readonly users: User[];
    constructor(
        @InjectRepository(Users)
        private User_Repository: Repository<Users>,
    ) {
        this.users = [
            {
                id: '1',
                username: 'john',
                password: 'test'
            },
            {
                id: '2',
                username: 'mary',
                password: 'ishappy'
            }
        ]
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

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