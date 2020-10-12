<<<<<<< HEAD
import { Body, Controller, Get,Delete, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
=======
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Delete } from '@nestjs/common';
import { ObjectID } from 'mongodb';
>>>>>>> 12892c78b4592e493d569b96b58c4548e52f74e8
import { ParseObjectIdPipe } from '../common/pipes';

import Comments from './comments.entity';

import { CreateCommentsDto } from '../dto/create-comments.dto';
import { CreateReportDto } from '../dto/create-reports.dto';

import { CommentsService } from './comments.service';
import { Report_Service } from '../reports/reports.service';

@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService,
                private reportService: Report_Service) {}
  
  @Get()
  async findAll():Promise<Comments[]>{
    return this.commentService.findAll();
  }

  @Get('/:comment_id')
  async findCommentsID(@Param('comment_id', ParseObjectIdPipe) comment_id: ObjectID): Promise<Comments[]> {
    return this.commentService.find(comment_id);
  }

  @Post()
  async create(@Body() createCommentsDto: CreateCommentsDto) {
    createCommentsDto.date_time = this.commentService.getDate();
    const newComment = this.commentService.create(createCommentsDto);
    return newComment;
  }
<<<<<<< HEAD
  @Delete('/:id')
  deleteGuide(@Param('id') id: string): Promise<void> {
    return this.commentsService.remove(id);
}
=======

  @Post('/:comment_id/reports')
  async createReport(@Param('comment_id', ParseObjectIdPipe) comment_id: ObjectID, @Body() createReport: CreateReportDto) {
    this.commentService.find(comment_id).then( res => {
      createReport.content_type = "comment";
      createReport.content_id = res[0].id.toString();
      if (createReport.report_string == null) createReport.report_string = "";
      const newReport = this.reportService.createReport(createReport);
      return newReport;
    });
  }

  @Delete('/:comment_id')
  async deleteComment(@Param('comment_id', ParseObjectIdPipe) comment_id: ObjectID) {
    return this.commentService.delete(comment_id);
  }
>>>>>>> 12892c78b4592e493d569b96b58c4548e52f74e8
}