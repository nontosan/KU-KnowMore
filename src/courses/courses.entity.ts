import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class Courses {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    course_code: string;

    @Column()
    course_name: string;
    
    @Column()
    teacher_name: string;
}

export default Courses;