import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Blog, } from '../interfaces/blog';

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

const CreateRwBlog=()=> {
  const [Nameblog, setNameblog]=useState("");
  const [Nameteacher, setNameteacher]=useState("");
  const [IDclass, setIDclass]=useState("");
  const [Nameclass, setNameclass]=useState("");

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
          alert("Save Success");
        } else{
          alert("Save Error");
        }
      });
  };
  return (
    <div className="bg_color">
      <div>Create Review Blog</div>
     <div className="Blog_Info">
      <Input_Nameblog setNameblog={setNameblog} />
      <Input_Idclass setIDclass={setIDclass} />
      <Input_Nameclass setNameclass={setNameclass} />
      <Input_Nameteacher setNameteacher={setNameteacher} />
    </div>
    <div className="Blog_Content">
      <CreateReviewContent blog_type={"create"} />
    </div>
      <div className="Confirm"> 
        <Link to="/">
          <div className="Cancel">
            <Button variant="danger"> Cancel </Button>
          </div>
        </Link>
        <Link to="/writesection/1234">
          <div className="Submit">
            <Button variant="success" onClick={handleNewBlogSave}> Submit </Button>
          </div>
        </Link>
      </div>
    </div>

  );
}
export default CreateRwBlog