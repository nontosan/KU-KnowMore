// IMPORT LIBRARY //
import {
  Link,
} from 'react-router-dom';
import { EmptyState } from 'react-wysiwyg-typescript';
import { convertToRaw } from 'draft-js';
import Button from 'react-bootstrap/Button';
// END OF IMPORT LIBRARY //
import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Blog,Review,create_Blog } from '../interfaces/blog';
import { Course } from '../interfaces/course';

// IMPORT COMPONENT //
import Input_Nameblog from './createblog_component/input_nameblog';
import Input_Idclass from './createblog_component/input_idclass';
import Input_Nameclass from './createblog_component/input_nameclass';
import Input_Nameteacher from './createblog_component/input_nameteacher';
import Confirm from './createblog_component/confirm';
import './createblog_component/input.css';
import CreateReviewContent from './Review_component/CreateReviewContent';
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import BlogsService from '../services/BlogsService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import 'bootstrap/dist/css/bootstrap.min.css';
// END OF IMPORT CSS //

//------------------------------------------------------------------//
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { propTypes } from 'react-bootstrap/esm/Image';
import CourseService from '../services/CourseService';

// Component head
const CreateRwBlog=(props : any)=> {
  const [blogName, setBlogName]=useState("");
  const [teacherName, setTeacherName]=useState("");
  const [courseCode, setCourseCode]=useState("");
  const [courseName, setCourseName]=useState("");
  // Review State
  const [teachScore, setTeachScore] = useState(0);
  const [workScore, setWorkScore] = useState(0);
  const [roomScore, setRoomScore] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const [editorValue, setEditorValue] = useState("");
  // Etc
  const blogId = window.location.pathname.split("/")[2];
  

  useEffect(() => {
    //alert("component rendered")
    if(blogId){
      BlogsService.fetchReviewOfBlog(blogId)
      .then(reviewArray => {
        let review_info = reviewArray[0];
        setTeachScore(review_info.teaching);
        setWorkScore(review_info.hw);
        setRoomScore(review_info.classroom);
        setOverallScore(review_info.overall);
        setEditorValue(review_info.content);  // Done
        BlogsService.fetchBlogSpecific(blogId)
        .then(blogArray => {
          let blog_info = blogArray[0];
          setBlogName(blog_info.blog_name); // Done
          setCourseCode(blog_info.course_id); // Done
          CourseService.fetchCourseFilter(blog_info.course_id,props.teacher_name)
          //CourseService.fetchCourseFilter(blog_info.course_id,props.teacher_name)
          .then(courseArray => {
            let course_info = courseArray[1];
            //setTeacherName(course_info.teacher_name);
            //setCourseName(course_info.course_name);         
          })
        })
      });
    }
  },[])

  // CreateNewBlog function
  const handleNewBlogSave = () => {
    const newBlog: create_Blog = {
      course_id: courseCode,
      user_id: "5f82fd5504eb8600aa617b6b",
      type: "review",
      blog_name: blogName,
    };
    BlogsService.createBlog(newBlog) 
      .then(savedNewBlog => {
        if (savedNewBlog !== null) {
          alert("Save Blog Success");
          if(savedNewBlog.id){
            //alert(savedNewBlog.id);
            handleNewReviewSave(savedNewBlog.id);
          }
        } else{
          //alert("Save Error");
        }
      });
  };

  const handleNewReviewSave = (blogid : string) => {
    const newReview: Review = {
      blog_id: blogid,
      teaching: teachScore,
      hw: workScore,
      classroom: roomScore,
      overall: overallScore,
      content: editorValue,
    };
    BlogsService.createReview(newReview,blogid) 
      .then(savedNewReview => {
        if (savedNewReview !== null) {
          alert("Save Review Success");
        } else{
          //alert("Save Error");
        }
      });
  }

  return (
    <div className="bg_color">
      <div className="header_word">
        <h1>สร้าง Review ใหม่</h1>
      </div>
     <div className="Blog_Info">
      <Input_Nameblog setNameblog={setBlogName} type={props.blogtype} value={blogName}/>
      <Input_Idclass setIDclass={setCourseCode} type={props.blogtype} value={courseCode}/>
      <Input_Nameclass setNameclass={setCourseName} type={props.blogtype} value={courseName}/>
      <Input_Nameteacher setNameteacher={setTeacherName} type={props.blogtype} value={teacherName}/>
    </div>
    <div className="Blog_Content">
      <div className="Editor">
          <ReactQuill 
            placeholder={"เขียนรีวิวลงที่นี้"}
            theme="snow" 
            value={editorValue} 
            onChange={setEditorValue}
          />
      </div>
      <div className="Slider">
        <CreateReviewContent 
        setTeachScore={setTeachScore} 
        setWorkScore={setWorkScore} 
        setRoomScore={setRoomScore} 
        setOverallScore={setOverallScore} 
        />
      </div>
    </div>
      <div className="Confirm"> 
        <Link to="/">
          <div className="Cancel">
            <Button className="cancel-button" variant="danger">Cancel</Button>
          </div>
        </Link>
        <Link to="/">
          <div className="Submit">
            <Button className="submit-button" variant="success" onClick={handleNewBlogSave}>Submit</Button>
          </div>
        </Link>
      </div>
    </div>

  );
}
export default CreateRwBlog