import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Blogs from './blogs.entity';

@Injectable()
export class Blog_Service {
    constructor(
        @InjectRepository(Blogs)
        private Blog_Repository: Repository<Blogs>,
    ) {}

    async findAllBlogs() : Promise<Blogs[]> {  
        return  this.Blog_Repository.find();
    }
    async findBlogsID(blog_id: ObjectID): Promise<Blogs[]> {
        return this.Blog_Repository.find({where: { _id: blog_id }});
    }
}