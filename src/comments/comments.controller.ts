import { Body, Controller, Get,Delete, UseGuards, Param, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

import Comments from './comments.entity';

import { CreateCommentsDto } from '../dto/create-comments.dto';
import { CreateReportDto } from '../dto/create-reports.dto';

import { CommentsService } from './comments.service';
import { Report_Service } from '../reports/reports.service';
import { SrvRecord } from 'dns';

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

  // @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCommentsDto: CreateCommentsDto) {
    createCommentsDto.date_time = this.commentService.getDate();
    const newComment = this.commentService.create(createCommentsDto);
    return newComment;
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteGuide(@Param('id') id: string){
    return this.commentService.remove(id);
  }

  @Delete('/:comment_id/withreport')
  async deletewrp(@Param('comment_id') comment_id: string) {
    return this.commentService.deletewithreport(comment_id);
  }

  // @UseGuards(JwtAuthGuard)
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

  /*@Delete('/:comment_id')
  async deleteComment(@Param('id') id: string): Promise<void> {
    return this.commentService.delete(comment_id);
  }*/
}