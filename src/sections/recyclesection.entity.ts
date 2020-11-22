import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class recycleSections {
    @ObjectIdColumn()
    id?: ObjectID;

    @ObjectIdColumn()
    old_id: ObjectID;

    @Column()
    section_name: string;

    @Column()
    content: string;
    
    @Column()
    blog_id: string;
}
export default recycleSections;

