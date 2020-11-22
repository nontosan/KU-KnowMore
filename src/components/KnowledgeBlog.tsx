// IMPORT LIBRARY //
import React, { useEffect , useState , Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {
    Link, Redirect, NavLink
  } from 'react-router-dom';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import DeleteModal from '../modals/DeleteModal';
import ShowLike from './ShowLike';
import UserAuthor from './UserAuthor';
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

const KnowledgeBlog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [BlogDelete, setBlogDelete] = useState<Blog>();
    const [statusDelete, setStatusDelete] = useState<boolean>(false);

    const fetchBlogs = async() => {
        const x =await BlogsService.fetchKnowledgeBlogs()
            .then(blogs => {
                //console.log(blogs);
                setBlogs(blogs);
                //console.log(blogs);
            });
    };

    const handleDelete = (blog:Blog) => {
        setShowDeleteModal(true);
        setBlogDelete(blog);
    }

    const closeModal = () => {
        setShowDeleteModal(false);
    }
    
    const submitDeleteBlog = () => {
        setShowDeleteModal(false);
        BlogsService.deleteBlog(BlogDelete?.id!)
            .then(res => {
                if (res) {
                    setStatusDelete(true);
                }
            })
    }

    const UserInfo = () => {
        console.log("HELLO");
    }

    useEffect(() => {
        fetchBlogs();
    },[]);

    useEffect(() => {
        if (statusDelete==true) {
            fetchBlogs();
            setStatusDelete(false);
        }
    },[statusDelete]);

    return (
        <div>
            <div className="hot-kl" style={{ marginBottom : "50px" }}>
                <Card.Header className="card-header">KNOWLEDGE BLOG</Card.Header>
                {blogs.map(blog => (
                    <div>
                        <Link className="show-all-blog knowledge" to={`/${blog.type}/${blog.id}`}>
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
            </div>
            {showDeleteModal && 
                <div>
                    <DeleteModal 
                        show = {showDeleteModal}
                        nameBlog = {BlogDelete?.blog_name}
                        deleteBlog = {submitDeleteBlog}
                        cancel = {closeModal}
                    />
                </div>
            }
        </div>
    );
}

export default KnowledgeBlog;
