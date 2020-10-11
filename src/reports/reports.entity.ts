import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class Reports {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    user_id: string;

    @Column()
    content_id: string;

    @Column()
    content_type: string;
    
    @Column()
    report_string: string;

    @Column()
    report_reason: string;
}

export default Reports;