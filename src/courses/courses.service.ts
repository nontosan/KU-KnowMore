import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID } from 'mongodb';
import { Repository } from 'typeorm';

import Courses from './courses.entity';

@Injectable()
export class Course_Service {
    constructor(@InjectRepository(Courses) private Course_Repository: Repository<Courses>) {}

    // --------------------------------------------------------------------------------
    // ========================              GET              =========================
    // --------------------------------------------------------------------------------

    async findAllCourses() : Promise<Courses[]> {  
        return this.Course_Repository.find();
    }

    async findCourseID(course_id: ObjectID): Promise<Courses[]> {
        return this.Course_Repository.find({where: { _id: course_id }});
    }

    async findAllCoursesTeacher(pname: string) : Promise<Courses[]> {  
        return this.Course_Repository.find({where: { teacher_name: pname }});
    }

    async findAllCoursesCode(code: string) : Promise<Courses[]> {  
        return this.Course_Repository.find({where: { course_code: code }});
    }
    
    async findAllCoursesName(cname: string) : Promise<Courses[]> {  
        return this.Course_Repository.find({where: { course_name: cname }});
    }
}