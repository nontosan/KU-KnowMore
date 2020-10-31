import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Users from './users.entity';
import {CreateUserDto} from '../dto/create-users.dto';
import { CreateSuperUserDto } from 'src/dto/create-superuser.dto';

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
                id: '5f82fd2e04eb8600aa617b66',
                username: 'aaaaaaaa',
                password: 'test'
            },
            {
                id: '5f82fd3504eb8600aa617b67',
                username: 'mary',
                password: 'ishappy'
            },
        ]
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async findUserIDFromUsername(username: string): Promise<Users[]> {
        return this.User_Repository.find({ where: { username: username }});
    }

    async findUserFromUserID(user_id: ObjectID): Promise<Users[]> {
        return this.User_Repository.find({ where: { _id: user_id }});
    }

    async findUserIDFromUID(user_id: string): Promise<Users> {
        var res: Users[] = await this.User_Repository.find({ where: {uid: user_id}});
        return res[0];
    }

    async createNewUser(user) {
        var createUser: CreateSuperUserDto = {
            cn: user.cn,
            uid: user.uid,
            sn: user.sn,
            campus: user.campus,
            first_name: user['first-name'],
            last_name: user['last-name'],
            thainame: user.thainame,
            thaiprename: user.thaiprename,
            givenname: user.givenname,
            faculty: user.faculty,
            faculty_id: user['faculty-id'],
            type_person: user['type-person'],
            profile_description: '',
            pic_name: '',
            username: '',
            pic_dir: ''       
        }
        return this.User_Repository.save(createUser);
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
    
    async uploadUserProfilePic(user_id: ObjectID, uploadUserProfile): Promise<Users[]>{
        this.User_Repository.update(user_id.toString(), uploadUserProfile);
        return this.findUserFromUserID(user_id);
    }
}