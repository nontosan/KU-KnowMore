import React, { useEffect , useState , Component } from 'react';
import { Blog } from '../interfaces/blog';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import BlogsService from '../services/BlogsService';

import {
    Link, Redirect,
  } from 'react-router-dom';

import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';


const ReviewBlog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = () => {
        BlogsService.fetchReviewBlogs()
            .then(blogs => {
                //console.log(blogs);
                setBlogs(blogs);
                //console.log(blogs);
            });
    };
    useEffect(() => {
        //console.log(blogs);
        fetchBlogs();
    },[]);
    return (
        <div>
            <div className="hot-kl">
                <Card.Header>REVIEW BLOG</Card.Header>
                {blogs.map(blog => ( 
                    <div>
                        <Link to={`/read${blog.type}/${blog.id}`}>
                            {blog.id} {blog.course_id} {blog.user_id} {blog.type} {blog.viewers} {blog.blog_name} {blog.last_edit}       
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewBlog;
