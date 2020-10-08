import React, { useEffect , useState , Component } from 'react';
import { Blog } from '../interfaces/blog';
import Card from 'react-bootstrap/Card';
import BlogsService from '../services/BlogsService';

import './section.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const KnowledgeBlog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = () => {
        BlogsService.fetchBlogs()
            .then(blogs => {
                setBlogs(blogs);
            });
    };

    useEffect(() => {
        fetchBlogs();
    },[]);
    return (
        <div>
            <div className="main-div">
                {blogs.map(blog => ( 
                    <Card className="nav-link bg-light navbar-light navbar-nav">
                        {blog.course_code} {blog.user_id} {blog.type} {blog.viewers} {blog.blog_name} {blog.last_edit}
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default KnowledgeBlog;
