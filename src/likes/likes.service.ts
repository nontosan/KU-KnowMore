import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Likes from './likes.entity';

@Injectable()
export class Like_Service {
    constructor(@InjectRepository(Likes)
                private Like_Repository: Repository<Likes>,
                ) {}

    // --------------------------------------------------------------------------------
    // ========================              GET              =========================
    // --------------------------------------------------------------------------------

    async getAllLikesFromBlog(blog_id: string) : Promise<Likes[]> {  
        return this.Like_Repository.find({where: { blog_id: blog_id }});
    }

    async getAllLikesFromUser(user_id: string) : Promise<Likes[]> {  
        return this.Like_Repository.find({where: { user_id: user_id }});
    }
}