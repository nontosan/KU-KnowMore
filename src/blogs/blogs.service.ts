import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Blogs from './blogs.entity';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { Course_Service } from '../courses/courses.service';

@Injectable()
export class Blog_Service {
    constructor(@InjectRepository(Blogs) private Blog_Repository: Repository<Blogs>, private courseService: Course_Service) {}

    // --------------------------------------------------------------------------------
    // ========================            Utility            =========================
    // --------------------------------------------------------------------------------

    getDate() : string {
        var today = new Date();
        var day = today.getDate().toString();
        var month = today.getMonth()+1;
        var year = today.getFullYear();

        day = day.length == 1 ? '0' + day : day

        return day + '/' + month + '/' + year
    }

    // --------------------------------------------------------------------------------
    // ========================              GET              =========================
    // --------------------------------------------------------------------------------

    async findAllBlogs() : Promise<Blogs[]> {  
        return this.Blog_Repository.find();
    }
    async findBlogsID(blog_id: ObjectID): Promise<Blogs[]> {
        return this.Blog_Repository.find({where: { _id: blog_id }});
    }

    async findAllBlogsSearch(Obj): Promise<Blogs[]> {
        var tmp = [];
        var filter1 = Obj.type;
        var filter2 = Obj.code;
        var filter3 = Obj.name;
        
        if (filter3) tmp = await this.courseService.findAllCoursesTeacher(filter3);
        else if (filter2) tmp = await this.courseService.findAllCoursesCode(filter2);
        else if (filter2 && filter3) tmp = await this.courseService.findAllCoursesCodeTeacher(filter2,filter3);

        //console.log(tmp)
        
        if (filter2 || filter3) {
            //Get all associated course id
            var res = [];
            var course_list = [];
            for (var x in tmp) {
                course_list.push(tmp[x].id.toString());
            }
            //console.log(course_list);

            //Make JSON
            for (var i = 0; i < course_list.length; i++) {
                //filter1 filter2,3
                if (filter1) var tmp2 = await this.Blog_Repository.find({where: {type:filter1, course_id: course_list[i] }});
                //filter2,3
                else var tmp2 = await this.Blog_Repository.find({where: { course_id: course_list[i] }});
                //console.log(tmp2)
                //Add into Result
                if (tmp2.length !== 0) for (var j = 0; j < tmp2.length; j++) res.push(tmp2[j]);
            }
            //console.log(res)
            return res;
        }

        if (filter1)
            return this.Blog_Repository.find({where: {type:filter1} });
        else
            return this.Blog_Repository.find();
    }

    
    // --------------------------------------------------------------------------------
    // ========================             POST              =========================
    // --------------------------------------------------------------------------------

    async createBlog(create: CreateBlogDto) {
        return this.Blog_Repository.save(create);
    }
}