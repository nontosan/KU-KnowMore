import { ObjectID } from 'mongodb';
import { Entity, Column, ObjectIdColumn} from 'typeorm';

@Entity()
export class Attachments {
    
    @ObjectIdColumn()
    _id?: ObjectID;

    @Column()
    filename: string;

    @Column()
    originalname: string;
    
    @Column()
    path: string;
        
    @Column()
    size: number;

    @Column()
    type: string;

    @Column()
    section_id: string;
}

export default Attachments;