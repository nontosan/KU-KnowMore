import { Body, Controller, Get, Param, Query, Post } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ParseObjectIdPipe } from '../common/pipes';

import Blogs from './blogs.entity';
import Sections from '../sections/sections.entity';
import Reviews from '../reviews/reviews.entity';
import Likes from '../likes/likes.entity';
import Comments from '../comments/comments.entity';

import { Blog_Service } from './blogs.service';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { CreateReportDto } from '../dto/create-report.dto';

import { Course_Service } from '../courses/courses.service';
import { Section_Service } from '../sections/sections.service';
import { Review_Service } from '../reviews/reviews.service';
import { Like_Service } from '../likes/likes.service';
import { CommentsService } from '../comments/comments.service';
import { Report_Service } from '../reports/reports.service';

@Controller('blogs')
export class Blog_Controller {
  constructor(private Service: Blog_Service,
              private courseService: Course_Service,
              private sectionService: Section_Service,
              private reviewService: Review_Service,
              private likeService: Like_Service,
              private commentService: CommentsService,
              private reportService: Report_Service) {}

  // --------------------------------------------------------------------------------
  // ========================              GET              =========================
  // --------------------------------------------------------------------------------

  @Get()
  async findAllBlogs(): Promise<Blogs[]> {
    //console.log(this.Service.getDate());
    return this.Service.findAllBlogs();
  }
  
  //type=3&order=3&code=0012304&subname=comsys&teachername=A
  @Get('search')
  async findBlogsIDSearch(@Query() query): Promise<Blogs[]> {
    const keys = Object.keys(query);
    const pairs = Object.entries(query);
    const Obj = {};
    for (var i of keys) {
      var value = pairs.find(element => element[0] == i)[1];
      Object.assign(Obj, i === "type" ? (value==3?{}:{type:value}) : {});
      Object.assign(Obj, i === "subname" ? {sname:value} : {});
      Object.assign(Obj, i === "teachername" ? {pname:value} : {});
      Object.assign(Obj, i === "order" ? {order:value} : {});
    }
    return this.Service.findAllBlogsSearch(Obj);
  }

  @Get('/:blog_id')
  async findBlogsID(@Param('blog_id', ParseObjectIdPipe) blog_id: ObjectID): Promise<Blogs[]> {
    return this.Service.findBlogsID(blog_id);
  }

  @Get('/:blog_id/sections')
  async findSectionsBlogs(@Param('blog_id') blog_id: string): Promise<Sections[]> {
    return this.sectionService.findSectionsBlogs(blog_id);
  }

  @Get('/:blog_id/reviews')
  async findReviewsBlogs(@Param('blog_id') blog_id: string): Promise<Reviews[]> {
    return this.reviewService.findReviewsBlogs(blog_id);
  }

  @Get('/:blog_id/likes')
  async getAllLikesFromBlog(@Param('blog_id') blog_id: string): Promise<Likes[]> {
    return this.likeService.getAllLikesFromBlog(blog_id);
  }

  @Get('/:blog_id/comments')
  async find(@Param('blog_id') blog_id: string): Promise<Comments[]> {
    return this.commentService.find(blog_id);
  }

  // --------------------------------------------------------------------------------
  // ========================              POST              ========================
  // --------------------------------------------------------------------------------

  @Post()
  async create(@Body() create: CreateBlogDto) {
    /* ---------------------- Version 2 --------------------------
    // Backend need to send
    // course_code, teacher_name, user_id, type, blog_name
    // const tmp = await this.courseService.findAllCoursesCodeTeacher(Object.course_code,Object.teacher_name);
    // create.course_id = tmp[0].id.toString()
    // create.viewers = 0;
    // create.last_edit = this.Service.getDate();
    // const newBlog = this.Service.createBlog(create);
    // return newBlog;
    // -----------------------------------------------------------
    */

    // Backend need to send
    // course_id, user_id, type, blog_name
    create.viewers = 0;
    create.last_edit = this.Service.getDate();
    const newBlog = this.Service.createBlog(create);
    return newBlog;
  }

  @Post('/:blog_id/reports')
  async createReport(@Param('blog_id', ParseObjectIdPipe) blog_id: ObjectID, @Body() createReport: CreateReportDto) {
    this.Service.findBlogsID(blog_id).then( res => {
      createReport.content_type = res[0].type;
      createReport.content_id = res[0].id.toString();
      if (createReport.report_string == null) createReport.report_string = "";
      const newReport = this.reportService.createReport(createReport);
      return newReport;
    });
  }
}
