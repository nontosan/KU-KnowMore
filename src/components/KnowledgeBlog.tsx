import React, { useEffect , useState , Component } from 'react';
import { Blog } from '../interfaces/blog';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import BlogsService from '../services/BlogsService';

import './section.css';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const KnowledgeBlog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = () => {
        BlogsService.fetchBlogs()
            .then(blogs => {
                console.log(blogs);
                setBlogs(blogs);
                console.log(blogs);
            });
    };
    useEffect(() => {
        console.log(blogs);
        fetchBlogs();
    },[]);
    return (
        <div>
            <div className="hot-kl">
                <Card.Header>KNOWLEDGE BLOG</Card.Header>
                {blogs.map(blog => ( 
                    <ListGroup variant="flush" className="show-blog">
                        <ListGroup.Item>{blog.course_id} {blog.user_id} {blog.type} {blog.viewers} {blog.blog_name} {blog.last_edit}</ListGroup.Item>
                    </ListGroup>
                ))}
            </div>
        </div>
    );
}

export default KnowledgeBlog;
