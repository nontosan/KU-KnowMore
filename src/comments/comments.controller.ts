import { Body, Controller, Get,Delete, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ParseObjectIdPipe } from '../common/pipes';
import   Comments  from './comments.entity';
import { CreateCommentsDto } from '../dto/create-comments.dto';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}
  
  @Get()
  async findAll():Promise<Comments[]>{
    return this.commentsService.findAll();
  }
  @Get(':BlogId')
  async find(@Param('BlogId') BlogId:string) :Promise<Comments[]> {
      return this.commentsService.find(BlogId);
  }

  @Post()
  async create(@Body() createCommentsDto: CreateCommentsDto) {
    createCommentsDto.date_time = this.commentsService.getDate();
    const newComment = this.commentsService.create(createCommentsDto);
    return newComment;
  }
  @Delete('/:id')
  deleteGuide(@Param('id') id: string): Promise<void> {
    return this.commentsService.remove(id);
}
}