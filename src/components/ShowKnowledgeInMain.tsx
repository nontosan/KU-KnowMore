// IMPORT LIBRARY //
import React, { useState,useEffect } from 'react';
import CreateEditSection from './createeditsection';

import {
    Link, Redirect, NavLink
  } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import BlogsService from "../services/BlogsService"
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import {Blog}  from "../interfaces/blog"
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/blogforclick.css"
// END OF IMPORT CSS //

//------------------------------------------------------------------//

const Showklinmain = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const fetchBlogs = () => {
        BlogsService.fetchBlogs()
            .then(blogs => {
                setBlogs(blogs.slice(0,4));
            });
    };
    useEffect(() => {
        fetchBlogs();
    },[]);
    const readknowledge=()=>{
        console.log("click readknowledge")
    }

    return (
        <div>
            {blogs.map(blog => ( 
                        <ListGroup.Item className="blogcontainer" >
                            <NavLink to={`/read${blog.type}/${blog.id}`}>
                                <button className="blogclick" onClick={readknowledge}>
                                    <div className="element">{blog.blog_name}</div>
                                    <div className="element">{blog.course_id}</div>
                                    <div className="element">  viwer {blog.viewers}</div>
                                    <div className="element">  last edit {blog.last_edit}</div>
                                </button>  
                            </NavLink>
                        </ListGroup.Item>
            ))}
        </div>
    )
};

export default Showklinmain;