import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class Recycle_blogs {
    @ObjectIdColumn()
    id?: ObjectID;

    @ObjectIdColumn()
    old_id: ObjectID;

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

export default Recycle_blogs;