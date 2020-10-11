import React, { useState,useEffect } from 'react';
import BlogsService from "../services/BlogsService"
import {Blog}  from "../interfaces/blog"
import ListGroup from 'react-bootstrap/ListGroup';


import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/blogforclick.css"

const Showklinmain = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [someblog,setsomeblog] = useState<Blog[]>([])
    const fetchBlogs = () => {
        BlogsService.fetchBlogs()
            .then(blogs => {
                setBlogs(blogs);
            });
        setsomeblog(blogs.slice(1,5))
    };
    useEffect(() => {
        fetchBlogs();
    },[]);
    console.log(blogs)
    console.log(someblog)

    return (
        <div>
            {blogs.map(blog => ( 
                        <ListGroup.Item className="blogcontainer" >
                            <button className="blogclick">
                            <div>{blog.blog_name}</div>
                            <div>{blog.course_code}</div>
                            <div>  viwer {blog.viewers}</div>
                            <div>  last edit {blog.last_edit}</div>
                            </button>
                        </ListGroup.Item>
            ))}
        </div>
    )
};

export default Showklinmain;