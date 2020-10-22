import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class Courses {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    Code: string;

    @Column()
    NameTh: string;

    @Column()
    NameEn: string;
    
    @Column()
    Teacher: string;
}

export default Courses;