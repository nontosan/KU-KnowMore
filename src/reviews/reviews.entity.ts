import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class Reviews {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    teaching: string;

    @Column()
    hw: string;
    
    @Column()
    classroom: string;

    @Column()
    overall: string;

    @Column()
    content: string;

    @Column()
    blog_id: string;
}

export default Reviews;