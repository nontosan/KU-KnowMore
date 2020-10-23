// IMPORT LIBRARY //
import React, { useEffect , useState , Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {
    Link,
  } from 'react-router-dom';
// END OF IMPORT LIBRARY //

// IMPORT SERVICE //
import BlogsService from '../services/BlogsService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog } from '../interfaces/blog';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// END OF IMPORT CSS //

//------------------------------------------------------------------//

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
