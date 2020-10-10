import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ParseObjectIdPipe } from '../common/pipes';
import   Comments  from './comments.entity';
import { CreateCommentsDto } from '../dto/create-comments.dto';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}
  @Get()
  async findAll(): Promise<Comments[]> {
      return this.commentsService.findAll();
  }

  @Post()
  async create(@Body() createCommentsDto: CreateCommentsDto) {
    createCommentsDto.date_time = this.commentsService.getDate();
    const newComment = this.commentsService.create(createCommentsDto);
    return newComment;
  }
}