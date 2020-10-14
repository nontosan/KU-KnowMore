import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

import Blogs from './blogs.entity';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { Course_Service } from '../courses/courses.service';
import { Like_Service } from 'src/likes/likes.service';

@Injectable()
export class Blog_Service {
    constructor(@InjectRepository(Blogs) 
                private Blog_Repository: Repository<Blogs>,
                private courseService: Course_Service,
                private likeService: Like_Service) {}

    // --------------------------------------------------------------------------------
    // ========================            Utility            =========================
    // --------------------------------------------------------------------------------

    getDate() : string {
        var today = new Date();
        var day = today.getDate().toString();
        var month = today.getMonth()+1;
        var year = today.getFullYear();

        day = day.length == 1 ? '0' + day : day

        return day + '/' + month + '/' + year
    }

    convertDateBack(date: string) : any {
        var day = date.substr(0,2)
        var month = date.substr(3,2)
        var year = date.substr(6,4)
        var today = new Date (month + " " + day + " " + year)
       
        return today
    }

    sortReturnIndex(toSort) {
        for (var i = 0; i < toSort.length; i++) {
          toSort[i] = [toSort[i], i];
        }
        toSort.sort(function(left, right) {
          return left[0] < right[0] ? -1 : 1;
        });
        toSort.sortIndices = [];
        for (var j = 0; j < toSort.length; j++) {
          toSort.sortIndices.push(toSort[j][1]);
          toSort[j] = toSort[j][0];
        }
        return toSort;
      }

    // -----------------------------------
    // USE THIS TO TEST     (No Order = Date by Default)
    // -----------------------------------
    // /search/?teachername=Jittat&order=3
    // -----------------------------------
    // Blog Details
    // Blog A : viewers 1, last_edit 06 / 10 / 2020 , likes 1
    // Blog B : viewers 69, last_edit 08 / 12 / 2019 , likes 3
    // Blog C : viewers 16, last_edit 11 / 10 / 2020 , likes 4
    // Blog D : viewers 28, last_edit 30 / 8 / 2020 , likes 1
    // -----------------------------------
    // Test Result
    // ORDER == 3 (Viewer) should get { B , D , C , A } { 69 , 28 , 16 , 1 }
    // ORDER == 2 (Likes ) should get { C , B , D , A } { 4 , 3 , 1 , 1 }
    // ORDER == 1 (Date  ) should get { C , A , D , B } { 11Oct20, 6Oct20, 30Aug20, 8Dec19 }
    // -----------------------------------

    async sortJSON(res: any, order_type: number) : Promise<Blogs[]> {
        // Viewer
        if (order_type == 3) {
            res.sort(function(a, b) {
                return b.viewers - a.viewers;
            });
        }
        // Likes
        else if (order_type == 2) {
            // Create Like Lists
            var likeList = []
            for (var x in res) {
                var blog_id = res[x].id.toString()
                likeList.push((await this.likeService.getAllLikesFromBlog(blog_id)).length);
            }
            // Sort For Index
            var sort = this.sortReturnIndex(likeList)
            console.log(sort)
            // Sort JSON
            var tmp = []
            for (var i = sort.length - 1; i >= 0; i--) {
                var index = sort.sortIndices[i]
                tmp.push(res[index])
                // console.log(res[index])
            }
            res = tmp;
        }
        // Dates
        else  {
            // Create Date Lists
            var dateList = []
            for (var i = 0; i < res.length; i++) {
                var date = new Date(this.convertDateBack(res[i].last_edit))
                dateList.push([date,i])
            }
            // console.log(dateList)
            // Sort Date
            dateList.sort(function(a,b){
                return b[0] - a[0];
              });
            console.log(dateList)
            // Sort JSON
            var tmp = []
            for (var i = 0; i < dateList.length; i++) {
                var index = dateList[i][1]
                tmp.push(res[index])
            }
            res = tmp;
        }
        console.log(res);
        console.log("Order Type: " + order_type)
        return res;
    }


    // --------------------------------------------------------------------------------
    // ========================              GET              =========================
    // --------------------------------------------------------------------------------

    async findAllBlogs() : Promise<Blogs[]> {  
        return this.Blog_Repository.find();
    }

    async findBlogsID(blog_id: ObjectID): Promise<Blogs[]> {
        return this.Blog_Repository.find({where: { _id: blog_id }});
    }

    async findAllBlogsSearch(Obj): Promise<Blogs[]> {
        var tmp = [];
        var res = [];
        var course_list = [];
        var type = (Obj.type ? (Obj.type == 1 ? "knowledge":(Obj.type == 2 ?"review":undefined)) : undefined);
        var sname = Obj.sname;
        var pname = Obj.pname;
        var order = (Obj.order ? parseInt(Obj.order) : 1);

        // Check if sname == code , else if sname == subjectname
        if (sname && !isNaN(sname)) {
            // Find all course_id with the same course_code , then save into course_list
            tmp = await this.courseService.findAllCoursesCode(sname)
            for (var x in tmp) {
                course_list.push(tmp[x].id.toString());
            }
        } else if (sname && isNaN(sname)) {
            // Find all course_id, then save (if sname is substring to course_name {case insensitive}) into course_list
            tmp = await this.courseService.findAllCourses()
            for (var x in tmp) {
                if (tmp[x].course_name.toLowerCase().includes(sname.toLowerCase()))
                    course_list.push(tmp[x].id.toString());
            }
        }

        // If include teacher name
        if (pname) {
            var course_list_tmp = [];
            tmp = await this.courseService.findAllCoursesTeacher(pname);
            // 2 Case,  both sname && pname   or    only pname
            if (sname) {
                // Result course_list are the intersection of this and sname_course_list
                for (var x in tmp) {
                    if (course_list.includes(tmp[x].id.toString()))
                        course_list_tmp.push(tmp[x].id.toString());
                }
            } else {
                // Just save it
                for (var x in tmp) {
                    course_list_tmp.push(tmp[x].id.toString());
                }
            }
            course_list = course_list_tmp;
        }
        
        // console.log("Course_List")
        // console.log(course_list)
        
        // Make JSON
        // If searched for sname or pname: Check inside , else normal search
        if (sname || pname) {
            // Specific Type, else all types
            for (var i = 0; i < course_list.length; i++) {
                // Save all the courses with specific type into res , else any types
                if (type) var tmp2 = await this.Blog_Repository.find({where: {type:type, course_id: course_list[i]} });
                else var tmp2 = await this.Blog_Repository.find({where: {course_id: course_list[i]} });
                //Add into Result
                if (tmp2.length != 0) for (var j = 0; j < tmp2.length; j++) res.push(tmp2[j]);
            }
        } else {
            // Specific Type or All Types
            if (type) res.push( await this.Blog_Repository.find({where: {type:type} }) );
            else res.push( await this.Blog_Repository.find());
            res = res[0]
        }
        
        console.log(res)

        return this.sortJSON(res,order);
    }

    // --------------------------------------------------------------------------------
    // ========================             POST              =========================
    // --------------------------------------------------------------------------------

    async createBlog(create: CreateBlogDto) {
        return this.Blog_Repository.save(create);
    }

    // --------------------------------------------------------------------------------
    // ========================             PUT              ==========================
    // --------------------------------------------------------------------------------

    async updateBlog(blog_id: string, updateBlog: Blogs) {
        return this.Blog_Repository.update(blog_id, updateBlog);
    }
}