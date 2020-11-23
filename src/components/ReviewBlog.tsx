// IMPORT LIBRARY //
import React, { useEffect , useState , Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {
    Link,
  } from 'react-router-dom';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import DeleteModal from '../modals/DeleteModal';
import UserAuthor from './UserAuthor';
import ShowLike from './ShowLike';
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import BlogsService from '../services/BlogsService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { Blog } from '../interfaces/blog';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import {LikeOutlined,LikeTwoTone,EyeOutlined} from '@ant-design/icons';
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
            <div className="hot-kl-noborder-top" style={{ marginBottom : "50px" }}>
                <Card.Header className="card-header">REVIEW BLOG</Card.Header>
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
                            <div className="blog-fl">
                                <UserAuthor
                                    userid = {blog.user_id}
                                />
                            </div>
                            
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReviewBlog;
