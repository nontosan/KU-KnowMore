import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Blog,Review } from '../interfaces/blog';

import Input_Nameblog from './createblog_component/input_nameblog';
import Input_Idclass from './createblog_component/input_idclass';
import Input_Nameclass from './createblog_component/input_nameclass';
import Input_Nameteacher from './createblog_component/input_nameteacher';
import Confirm from './createblog_component/confirm';
import './createblog_component/input.css';
import Button from 'react-bootstrap/Button';
import CreateReviewContent from './Review_component/CreateReviewContent';

import {
  Link,
} from 'react-router-dom';

import BlogsService from '../services/BlogsService';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { propTypes } from 'react-bootstrap/esm/Image';

// Component head
const CreateRwBlog=(props : any)=> {
  const [Nameblog, setNameblog]=useState("");
  const [Nameteacher, setNameteacher]=useState("");
  const [IDclass, setIDclass]=useState("");
  const [Nameclass, setNameclass]=useState("");
  // Review State
  const [teachScore, setTeachScore] = useState(0);
  const [workScore, setWorkScore] = useState(0);
  const [roomScore, setRoomScore] = useState(0);
  const [overallScore, setOverallScore] = useState(0);
  const [editorValue, setEditorValue] = useState("");

  useEffect(() => {
    //alert("component rendered")
    if(props.blogtype == "edit"){
      BlogsService.fetchReviewOfBlog(props.blogid)
      .then(reviewArray => {
        let review_info = reviewArray[0];
        setTeachScore(review_info.teaching);
        setWorkScore(review_info.hw);
        setRoomScore(review_info.classroom);
        setOverallScore(review_info.overall);
        setEditorValue(review_info.content);
        BlogsService.fetchBlogSpecific(props.blogid)
        .then(blogArray => {
          let blog_info = blogArray[0];
          setNameblog(blog_info.blog_name);
          setIDclass(blog_info.course_id);
          // To be continue 
        })
      });
    }
  },[])

  // CreateNewBlog function
  const handleNewBlogSave = () => {
    const newBlog: Blog = {
      course_id: IDclass,
      user_id: "5f82fd5504eb8600aa617b6b",
      type: "review",
      blog_name: Nameblog,
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
      <Input_Nameblog setNameblog={setNameblog} />
      <Input_Idclass setIDclass={setIDclass} />
      <Input_Nameclass setNameclass={setNameclass} />
      <Input_Nameteacher setNameteacher={setNameteacher} />
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