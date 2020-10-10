import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

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

}
