import React, { useState,useEffect, useImperativeHandle } from 'react'
import { Redirect } from 'react-router-dom';
import { Section_Edit } from '../interfaces/SectionEdit';
import  loadeditsection from "../services/loadeditsection";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { Blog }from '../interfaces/blog'
import AddSection from '../photo/addsection.png';
import Card from 'react-bootstrap/Card';
import BlogsService from "../services/BlogsService"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

import Like from '../photo/like.png';
import Viewer from '../photo/viewer.png';
import Alert from '../photo/alert.png';

import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type editsection={
  section:Section_Edit
}
type blogidformpagebefore={
  blog_id:string
}
const ReadBlogReview = (props:any) => {
  const [sections,setsections] = useState<Section_Edit[]>([])
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
  },[])

  return (
    <div>
      <div className="hot-kl">
        <Card.Header>REVIEW ISUS</Card.Header>
      </div>
      <div className="hot-kl">
        {blogsInfomation.map(blogInfomation=>(
          <Card.Header>
            Blog Name : {blogInfomation.blog_name} <br />
            Course ID : {blogInfomation.course_id}
          </Card.Header>
        ))}
      </div>
      <div className="hot-kl">
        {sections.map(item=>(
          <div>
            <div>{sections}13123123213</div>
          </div>
        ))}
      </div>
      <div className="hot-kl">
        <Card.Header>
          <Image className="likebar-pic" src={Like} /> 100
          <Image className="likebar-pic" src={Viewer} />50
          <Image className="likebar-pic" src={Alert} />
        </Card.Header>
      </div>
      <div  className="hot-kl">
        <Card.Header>COMMENT</Card.Header>
      </div>
    </div>
  );
};

export default ReadBlogReview
