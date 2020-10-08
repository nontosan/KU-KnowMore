import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class Blogs {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    course_id: string;

    @Column()
    user_id: string;
    
    @Column()
    type: string;
    
    @Column()
    viewers: number;
    
    @Column()
    blog_name: string;
    
    @Column()
    last_edit: string;
}

export default Blogs;