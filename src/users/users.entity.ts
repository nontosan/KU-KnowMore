import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class Users {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    name: string;

    @Column()
    profile_description: string;
    
    @Column()
    pic_name: string;
    
    @Column()
    username: number;
    
    @Column()
    pic_dir: string;
}

export default Users;