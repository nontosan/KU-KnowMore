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
        return this.Blog_Repository.find();
    }
    async findBlogsID(blog_id: ObjectID): Promise<Blogs[]> {
        return this.Blog_Repository.find({where: { _id: blog_id }});
    }

    async findAllBlogsFilter(Obj): Promise<Blogs[]> {
        var filter1 = Obj.type;
        var filter2 = Obj.code;
        var filter3 = Obj.name;

        // ปล. ถ้ามีวิธีที่ดีกว่านี้ ก็แก้ด้วย   PS..IF THERE IS A BETTER WAY, PLEASE OPTIMIZE

        if (filter1 && filter2 && filter3)
            return this.Blog_Repository.find({where: {type:filter1, course_code:filter2, blog_name:filter3} });
        else if (filter1 && filter2)
            return this.Blog_Repository.find({where: {type:filter1, course_code:filter2} });
        else if (filter1 && filter3)
            return this.Blog_Repository.find({where: {type:filter1, blog_name:filter3} });
        else if (filter2 && filter3)
            return this.Blog_Repository.find({where: {course_code:filter2, blog_name:filter3} });
        else if (filter1)
            return this.Blog_Repository.find({where: {type:filter1} });
        else if (filter2)
            return this.Blog_Repository.find({where: {course_code:filter2} });
        else if (filter3)
            return this.Blog_Repository.find({where: {blog_name:filter3} });
        else
            return this.Blog_Repository.find();
    }

    
}