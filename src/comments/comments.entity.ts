import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class Comments {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    blog_id: string;

    @Column()
    user_id: string;
    
    @Column()
    content: string;
    
    @Column()
    date_time: number;
}

export default Comments;