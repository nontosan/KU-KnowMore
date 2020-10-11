import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class Reviews {
    @ObjectIdColumn()
    id?: ObjectID;

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

export default Reviews;