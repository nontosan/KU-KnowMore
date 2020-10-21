import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity()
export class loginpage {
    @ObjectIdColumn()
    id?: ObjectID;

    @Column()
    username: string;
    @Column()
    password:string;
    @Column()
    token: string;
}

export default loginpage;