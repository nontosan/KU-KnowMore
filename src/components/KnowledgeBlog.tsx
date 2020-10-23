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
// END OF IMPORT COMPONENT //

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

const KnowledgeBlog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [BlogDelete, setBlogDelete] = useState<Blog>();
    const [statusDelete, setStatusDelete] = useState<boolean>(false);

    const fetchBlogs = () => {
        BlogsService.fetchKnowledgeBlogs()
            .then(blogs => {
                console.log(blogs);
                setBlogs(blogs);
                console.log(blogs);
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
        console.log('EIEI');
        setShowDeleteModal(false);
        BlogsService.deleteBlog(BlogDelete?.id!)
            .then(res => {
                if (res) {
                    setStatusDelete(true);
                }
            })
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
            <div className="hot-kl">
                <Card.Header>KNOWLEDGE BLOG</Card.Header>
                {blogs.map(blog => (
                    <ListGroup.Item className="blogcontainer blogclick" >
                        <NavLink to={`/read${blog.type}/${blog.id}`}>
                            <div className="element">{blog.blog_name}  viewer {blog.viewers}  last edit {blog.last_edit}</div>
                        </NavLink>
                        <Button variant="outline-danger" onClick={() => handleDelete(blog)}>DELETE</Button>
                        <Button variant="outline-warning">EDIT</Button>
                    </ListGroup.Item>
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
