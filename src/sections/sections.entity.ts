import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class Sections {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    section_name: string;

    @Column()
    content: string;
    
    @Column()
    blog_id: string;
}

export default Sections;