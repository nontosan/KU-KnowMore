import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Reviews from './reviews.entity';
import {CreateReviewsDto} from '../dto/create-review.dto';

@Injectable()
export class Review_Service {
    constructor(
        @InjectRepository(Reviews)
        private Review_Repository: Repository<Reviews>,
    ) {}

    async findAllReviews() : Promise<Reviews[]> {
        return this.Review_Repository.find();
    }
    async findReviewsID(review_id: ObjectID): Promise<Reviews[]> {
        return this.Review_Repository.find({where: { _id: review_id }});
    }
    async findReviewsBlogs(blog_id: string): Promise<Reviews[]> {
        return this.Review_Repository.find({where: { blog_id: blog_id }});
    }
    async createReviews(createReviewsDto: CreateReviewsDto) {
        return this.Review_Repository.save(createReviewsDto);
      }
    async remove(id: string): Promise<void> {
        await this.Review_Repository.delete(id);
      }

}