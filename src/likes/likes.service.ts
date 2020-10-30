import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Likes from './likes.entity';

import { CreateLikeDto } from '../dto/create-like.dto';

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

    async postLike(likedto: CreateLikeDto) {
        var userLikeCheck = await this.Like_Repository.find({where: { user_id: likedto.user_id, blog_id: likedto.blog_id }});
        if (userLikeCheck[0] == undefined) {
            this.Like_Repository.save(likedto);
            return { "Status": "Like" }
        }
        else {
            this.Like_Repository.remove(userLikeCheck[0]);
            return { "Status": "Unlike" }
        }
    }
}