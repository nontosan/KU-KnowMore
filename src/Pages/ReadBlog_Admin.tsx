import React, { useState,useEffect, useImperativeHandle } from 'react'
import { Section_Edit } from '../interfaces/section_edit';
import { Blog }from '../interfaces/blog'
import Card from 'react-bootstrap/Card';
import BlogsService from "../services/BlogsService";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DelBlog_Modal from '../components/modal/DelBlog_Modal'
import Show_Review from '../components/showcontent/Show_Review';
import Show_Knowledge from '../components/showcontent/Show_Knowledge';
import NavBar from '../components/Navbar';

type editsection={
  section:Section_Edit
}

const ReadBlog_Admin = (props:any) => {
  const [sections,setsections] = useState<Section_Edit[]>([])
  const [blogsInfo,setBlogsInfomation] = useState<Blog[]>([])
 
  
  
  const blogID = props.match.params.blogId
  console.log(props.match.params)
  //fetch blog from database
  const fetchBlogs = () => {
    BlogsService.fetchBlogSpecific(blogID)
      .then(blogInfo => {
        setBlogsInfomation(blogInfo);
        console.log(blogInfo);
      });
  }

  //delete section  
  const handledeletesection=()=>{
    fetch("api_path for delete section",{
      method:"Post",
      headers:{'Content-Type':'appllication/json'},
      body:JSON.stringify(sections)
    }).then(res=>res.json())
  }

  //refreh
  useEffect(()=>{
    fetchBlogs();
  },[])
  
  const blogtype = blogsInfo.map(a=>a.type);

  return (
    <div>
      <NavBar />
      <div className="hot-kl">
        <Card.Header>
          {(blogtype[0]==='review') ? 'Review Blog': 'Knowledge Blog'} &nbsp;
          <DelBlog_Modal blogID={blogID}/>
        </Card.Header>
      </div>
      {/** 
      <div className="hot-kl">
        {blogsInfo.map(blog=>(
          <Card.Header>
            Blog Name : {blog.blog_name} <br />
            Course ID : {blog.course_id}
          </Card.Header>
        ))}
      </div>
        */}
      <div className="hot-kl">
        <Card.Header>
        {(blogtype[0]==='review') ? <Show_Review/> : <Show_Knowledge/>} 
        </Card.Header>
      </div>
    {/** 
      <div  className="hot-kl">
        <Card.Header>COMMENT</Card.Header>
      </div>
    */}
    </div>
  )
}

export default ReadBlog_Admin;
