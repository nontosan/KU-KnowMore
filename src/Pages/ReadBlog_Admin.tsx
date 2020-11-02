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
import '../style/readBlog.css'
import { Navbar } from 'react-bootstrap';
import NavBar from '../components/Navbar';
type editsection={
  section:Section_Edit
}

const ReadBlog_Admin = (props:any) => {
  const [sections,setsections] = useState<Section_Edit[]>([])
  const [blogsInfo,setBlogsInfomation] = useState<Blog[]>([])
 
  const blogID = props.match.params.blogId
  
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
  const blogname = blogsInfo.map(a=>a.blog_name)

  return (

    <div className="bgcolor">
      <NavBar/>
      <div className="main-container">
        <Card>
          <Card.Header>
            <div className="alignleft">{blogname}</div>
            <div className="alignright">
              {(blogtype[0]==='review') ? '(Review Blog)': '(Knowledge Blog)'}&nbsp;
              <DelBlog_Modal blogID={blogID}/>
            </div>
          </Card.Header>
          <Card.Body>
            {(blogtype[0]==='review') ? <Show_Review/> : <Show_Knowledge/>} 
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default ReadBlog_Admin;
