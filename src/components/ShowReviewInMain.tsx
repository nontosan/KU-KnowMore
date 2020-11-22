// IMPORT LIBRARY //
import React, { useState,useEffect } from 'react';
import CreateEditSection from './createeditsection';

import {
    Link, Redirect, NavLink
  } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import UserAuthor from './UserAuthor';
import ShowLike from './ShowLike';
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
import {LikeOutlined,LikeTwoTone,EyeOutlined} from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/blogforclick.css"
// END OF IMPORT CSS //

//------------------------------------------------------------------//

const Showrwinmain = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const fetchBlogs = () => {
        BlogsService.fetchBlogfilter("?type=2&order=1")
            .then(blogs => {
                setBlogs(blogs.slice(0,10));
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
                    <div>
                        <Link className="show-all-blog review" to={`/${blog.type}/${blog.id}`}>
                            <div className="blog-fl">
                                {blog.blog_name}
                            </div>
                            <div className="blog-fl" style={{ textAlign : "center" }}>
                                <ShowLike blogid={blog.id}/>
                                <EyeOutlined />&nbsp;&nbsp;{blog.viewers} 
                            </div>
                            <div className="blog-fl" style={{ textAlign : "center" }}>
                                Last Edit : {blog.last_edit}
                            </div>
                            <div className="blog-fl" style={{ textAlign : "center" }}>
                                <UserAuthor
                                    userid = {blog.user_id}
                                />
                            </div>
                            
                        </Link>
                    </div>
                ))}
            {false &&
                <div>
                    {blogs.map(blog => ( 
                <ListGroup.Item className="blogcontainer" >
                    <NavLink to={`/${blog.type}/${blog.id}`}>
                        <button className="blogclick" onClick={readknowledge}>
                            <div className="element">{blog.blog_name}</div>
                            <div className="element">  viewer {blog.viewers}</div>
                            <div className="element">  last edit {blog.last_edit}</div>
                        </button>  
                    </NavLink>
                </ListGroup.Item>
            ))}
                </div>
            }
            
        </div>
    )
};

export default Showrwinmain;