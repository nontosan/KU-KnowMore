import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class Likes {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    blog_id: string;

    @Column()
    user_id: string;
}

export default Likes;