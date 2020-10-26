import React, { useState,useEffect, useImperativeHandle } from 'react'
import { Section_Edit } from '../interfaces/section_edit';
import { Blog }from '../interfaces/blog'
import Card from 'react-bootstrap/Card';
import BlogsService from "../services/BlogsService"
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type editsection={
  section:Section_Edit
}

const ReadBlog_Admin = (props:any) => {
  const [sections,setsections] = useState<Section_Edit[]>([])
  const [blogsInfo,setBlogsInfomation] = useState<Blog[]>([])
  
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
  const DeleteBlog = () => {
    BlogsService.deleteBlog(blogId)
    .then(blogs => {
        console.log(blogs)
        console.log("done")
    })
  }

  //refreh
  useEffect(()=>{
    fetchBlogs();
  },[])

  const blogtype = blogsInfo.map(a=>a.type)

  return (
    <div>
      <div className="hot-kl">
        <Card.Header>
          {(blogtype[0]==='review') ? 'Review Blog' : 'Knowledge Blog'} &nbsp;
          <button onClick = {e => DeleteBlog()}>
            DELETE
          </button> 
        </Card.Header>
      </div>
      <div className="hot-kl">
        {blogsInfo.map(blog=>(
          <Card.Header>
            Blog Name : {blog.blog_name} <br />
            Course ID : {blog.course_id}
          </Card.Header>
        ))}
      </div>
      <div className="hot-kl">
        <Card.Header>
            <div>
              Content
            </div>
        </Card.Header>
      </div>
      <div  className="hot-kl">
        <Card.Header>COMMENT</Card.Header>
      </div>
    </div>
  )
}

export default ReadBlog_Admin
