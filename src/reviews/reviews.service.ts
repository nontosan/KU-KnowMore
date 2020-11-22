import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Reviews from './reviews.entity';
import recycleReviews from './recyclereviews.entity';

import { CreateReviewsDto } from '../dto/create-review.dto';

@Injectable()
export class Review_Service {
    constructor(
        @InjectRepository(Reviews)
        private Review_Repository: Repository<Reviews>,

        @InjectRepository(recycleReviews)
        private Recycle_Repository: Repository<recycleReviews>   
        ){}

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
    async remove(id: string):Promise<{}> {
        var Reviews=await this.findReviewsID(new ObjectID(id));
        var saveReview={
            "old_id":Reviews[0].id,
            "teaching":Reviews[0].teaching,
            "hw":Reviews[0].hw,
            "classroom":Reviews[0].classroom,
            "overall":Reviews[0].overall,
            "content":Reviews[0].content,
            "blog_id":Reviews[0].blog_id
        }
        await this.Recycle_Repository.save(saveReview)
        try{
            await this.Review_Repository.delete(id);
            return { "status": id.toString() + " have been successfully moved"};
        } catch (error) {
            return {
                "statusCode": 500,
                "message": "Internal server error"
            }
        }
    }
    async update(review_id: string, updateReview: Reviews) {
        return this.Review_Repository.update(review_id, updateReview)
    }
}