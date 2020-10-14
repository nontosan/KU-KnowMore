import { Body, Controller, Get, HttpException, HttpStatus,Delete, Param, Post, Put } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

import { CreateReviewsDto } from 'src/dto/create-review.dto';
import Reviews from './reviews.entity';

import { Review_Service } from './reviews.service';

@Controller('Reviews')
export class Review_Controller {
  constructor(private Service: Review_Service) {}

  @Get()
  async findAllReviews(): Promise<Reviews[]> {
    return this.Service.findAllReviews();
  }
  
  @Get('/:Review_id')
  async findReviewsID(@Param('Review_id', ParseObjectIdPipe) Review_id: ObjectID): Promise<Reviews[]> {
    return this.Service.findReviewsID(Review_id);
  }
  @Post()
  async create(@Body() createreview: CreateReviewsDto) {
    const newReview = this.Service.createReviews(createreview);
    return newReview;
  }

  @Delete('/:id')
  deleteReviews(@Param('id') id: string): Promise<void> {
    return this.Service.remove(id);
  }

  @Put('/:Review_id')
  async update(@Param('Review_id') Reviews_id: string, @Body() updateReview: Reviews) {
    return this.Service.update(Reviews_id, updateReview);
  }

}
