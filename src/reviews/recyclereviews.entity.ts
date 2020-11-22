import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class recycleReviews {
    @ObjectIdColumn()
    id?: ObjectID;

    @ObjectIdColumn()
    old_id: ObjectID;

    @Column()
    teaching: number;

    @Column()
    hw: number;
    
    @Column()
    classroom: number;

    @Column()
    overall: number;

    @Column()
    content: string;

    @Column()
    blog_id: string;
}

export default recycleReviews;