// IMPORT LIBRARY //
import React, { useState,useEffect, useImperativeHandle } from 'react'
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
// END OF IMPORT LIBRARY //

// IMPORT SERVICE //
import BlogsService from "../services/BlogsService"
import Comment_component from "./comment"
import LikeViewReport from "../gadget/LikeViewReport"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import {useHistory} from "react-router"

// IMPORT INTERFACE //
import { Section_Edit } from '../interfaces/SectionEdit';
import { Blog }from '../interfaces/blog'
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// END OF IMPORT CSS //

// IMPORT PHOTO //
import Like from '../photo/like.png';
import Viewer from '../photo/viewer.png';
import Alert from '../photo/alert.png';
// END OF IMPORT PHOTO //

//------------------------------------------------------------------//

type editsection={
  section:Section_Edit
}
type blogidformpagebefore={
  blog_id:string
}
const ReadBlogReview = (props:any) => {
  const [sections,setsections] = useState<Section_Edit[]>([])
  const [blogsInfomation,setBlogsInfomation] = useState<Blog[]>([])
  const history=useHistory()
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
      <LikeViewReport x={blogsInfomation}/>
      <div  className="hot-kl">
        <Card.Header>COMMENT</Card.Header>
        <Comment_component />
      </div>
      <button onClick={e=>history.goBack()}>back</button>
    </div>
  );
};

export default ReadBlogReview
