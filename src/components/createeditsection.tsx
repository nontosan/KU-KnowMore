import React, { useState,useEffect, useImperativeHandle } from 'react'
import { Redirect } from 'react-router-dom';
import { Section_Edit } from '../interfaces/SectionEdit';
import  loadeditsection from "../services/loadeditsection";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Blog }from '../interfaces/blog'
import AddSection from '../photo/addsection.png';
import BlogsService from "../services/BlogsService"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import './section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditBlogContent from '../gadget/editblogcontent';

type editsection={
  section:Section_Edit
}
type blogidformpagebefore={
  blog_id:string
}
const CreateEditSection = (props:any) => {
  const [sections,setsections] = useState<Section_Edit[]>([])
<<<<<<< HEAD
  const [blogs,setting] = useState<Blog[]>([])
  
  //console.log(props.match.params)
  const blogIdqq = props.match.params.blogId
  
  //fetch blog from database
  const fetchBlogs = ()=>{
    BlogsService.fetchBlogSpecific(blogIdqq.toString())
    .then(blog => {
    setting(blog)
    console.info(blog)
    });
=======
  const [blogsInfomation,setBlogsInfomation] = useState<Blog[]>([])
  
  console.log(props.match.params)
  const blogId = props.match.params.blogId
  
  //fetch blog from database
  const fetchBlogs = () => {
    BlogsService.fetchBlogSpecific(blogId)
      .then(blogInfo => {
        setBlogsInfomation(blogInfo);
        console.log(blogInfo);
      });
>>>>>>> 70f9acacb18d292f1b5fd21ee8056f704c4e35c8
  }

  //function fetch section form database
  const fetchsection=()=>{

  }

  //delete section  
  const handledeletesection=()=>{
    fetch("api_path for delete section",{
      method:"Post",
      headers:{'Content-Type':'appllication/json'},
      body:JSON.stringify(sections)
    }).then(res=>res.json())
  }


  //edit section => create route with section data from backend
  const handleeditsection=()=>{
    console.log("create route to create section")
  }

  //refreh
  useEffect(()=>{
    fetchBlogs();
<<<<<<< HEAD
    console.log("refresh")
    console.log("hello")
    console.log(blogs);
  },[])
  //<EditBlogContent blog={blogs}/>
  return (
    <div>
      {blogIdqq}
      {blogs}
=======
  },[])

  return (
    <div>
      {blogsInfomation.map(blogInfomation=>(
        <div>
          <h3>Blog Name : {blogInfomation.blog_name}</h3>
          <h3>Course ID : {blogInfomation.course_id}</h3>
        </div>
      ))}
>>>>>>> 70f9acacb18d292f1b5fd21ee8056f704c4e35c8
      <div>
        {sections.map(item=>(
          <div>
            <div>{sections}</div>
            <button onClick={handledeletesection}>edit</button>
            <button onClick={handleeditsection}>delete</button> 
          </div>
        ))}
      </div>
      <div className="div-addsection">
        <Link to={`/writeSection/${blogId}`}>
          <Button variant="outline-secondary" className="button-addsection">
            <Image className="addsection" src={AddSection} roundedCircle />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateEditSection
