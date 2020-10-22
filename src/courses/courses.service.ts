import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID } from 'mongodb';
import { Repository } from 'typeorm';
//import * as fs from 'fs';

import Courses from './courses.entity';

//import { CreateCourseDto } from '../dto/create-courses.dto';

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
        return this.Course_Repository.find({where: { Teacher: pname }});
    }

    async findAllCoursesCode(code: string) : Promise<Courses[]> {  
        return this.Course_Repository.find({where: { Code: code }});
    }
    
    async findAllCoursesName(cname: string) : Promise<Courses[]> {  
        return this.Course_Repository.find({where: { NameEn: cname }});
    }
    /*
    async add() {
        fs.readFile('/root/data/backend/src/courses/final section.json', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }
        
            // parse JSON object
            const user = JSON.parse(data);
        
            // print JSON object
            //console.log(user.section[0]);
            const courseArray = user.section;
            courseArray.forEach(element => {
                //console.log(element.Code);
                
                var course : CreateCourseDto = {
                    Code: element.Code,
                    NameTh: element.NameTh,
                    NameEn: element.NameEn,
                    Teacher: element.Teacher,
                };
                //console.log(course);
                this.Course_Repository.save(course);
            });
        });
        //return this.Course_Repository.save(course);
    }*/
}