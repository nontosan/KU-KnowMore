// IMPORT LIBRARY //
import React, { useState , Component, useEffect, Suspense } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import BlogService from "../services/BlogsService"
import {Blog} from "../interfaces/blog"
import ListGroup from 'react-bootstrap/ListGroup';
import ImageComponent from './Display';
import Card from 'react-bootstrap/Card';
import {
    Link, Redirect,
  } from 'react-router-dom';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import DeleteModal from '../modals/DeleteModal';
import UserAuthor from './UserAuthor';
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import ProfileService from '../services/ProfileService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { User_Sch } from '../interfaces/user';
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// END OF IMPORT CSS //

// IMPORT PHOTO //
import ProfilePic from '../photo/profilepic.png';
// END OF IMPORT PHOTO //

//------------------------------------------------------------------//

const UserPage = (props:any) => {
    const [userInformation, setUserInformation] = useState<User_Sch[]>([]);
    const [blogs,setBlogs] = useState<Blog[]>([])
    const [UrlLink, setUrl]=useState<string>("");
    const [afterSave, setafterSave] = useState<boolean>(false);
    const userId = props.match.params.userId
    const fetchBlogs=()=>{
        //may use userid from location
        BlogService.fetchBlogfilter(`?userid=${userId}`).then(res=>{
            setBlogs(res)
            console.log(res)
        })
    }
    const handledelete=(blogId:any)=>{
        BlogService.deleteBlog(blogId).then(res=>{
            if(res!==null){
                alert("already delete")
            }
            else{
                alert("delete error??")
            }
        })
    }
    const fetchProfile = () => {
        ProfileService.fetchProfileSpecific(userId)
            .then(userInfo => {
                setUserInformation(userInfo);
                console.log(userInfo);
            })
    }
    const checktype=(item:string)=>{
        if(item==="knowledge"){
            return true
        }
        else{
            return false
        }
    }

    const isCanEdit = (usid:any) => {
        if (usid == userId){
            return true;
        }
        else {
            return false;
        }
    }

    const handleRedirect = (blog_id : any) => {
        setUrl(blog_id);
    }

    useEffect(() => {
        fetchProfile();
        fetchBlogs()
    },[])

    useEffect(() => {
        if (UrlLink !== ""){
          console.log(UrlLink);
          setafterSave(!afterSave);
        }
      },[UrlLink]);

    return (
        <div>
            <div className="userpage-top-div">
                <Suspense  fallback={<div>Loading... </div>}>
                    {userInformation.map(a=>
                        <div className="profile-page-pic blog-fl">
                            <ImageComponent className="profile-in-userpage" userid={a.pic_dir}/>
                        </div>
                    )}
                </Suspense>
                {userInformation.map(userInformation => (
                    <div className="profile-info blog-fl">
                        <h4>Name : {userInformation.name}</h4>
                        <h4>Username : {userInformation.username}</h4>
                        <h4>Profile Description : {userInformation.profile_description} </h4>
                        <h4>Activity : </h4>
                    </div>
                ))}
                <Link className="blog-fr" to={`/editProfile/${userId}`}>
                    <Button className="blog-fr" variant="danger">EDIT USER INFORMATION</Button>
                </Link>
            </div>
            <div className="hot-kl" style={{ marginBottom : "50px" }}>
                <Card.Header className="card-header">MY BLOG</Card.Header>
                {blogs.map(blog => {
                    if(blog.user_id==userId){
                        return (
                            <div>
                                <Link className="show-all-blog" to={`/read${blog.type}/${blog.id}`}>
                                    <div className="blog-fl black-font">
                                        {blog.blog_name}
                                    </div>
                                    <div className="blog-fl black-font" style={{ textAlign : "center" }}>
                                        {blog.viewers} View
                                    </div>
                                    <div className="blog-fl black-font" style={{ textAlign : "center" }}>
                                        Last Edit : {blog.last_edit}
                                    </div>
                                    <UserAuthor
                                        userid = {blog.user_id}
                                    />
                                </Link>
                            </div>
                )}})}
            </div>
            {
                blogs.map((item:Blog)=>{
                    if(item.user_id==userId){
                        return checktype(item.type)?
                            <ListGroup variant="flush" className="show-blog">
                                <div>
                                    <Link className="blog-fl" to={`/read${item.type}/${item.id}`}>
                                        <ListGroup.Item><strong>{item.blog_name} {item.user_id}</strong></ListGroup.Item>
                                    </Link>
                                    {isCanEdit(item.user_id) &&
                                        <div>
                                            <Link to={`/myKnowledge/${item.id}`}>
                                                <Button className="blog-fl" variant="outline-danger">EDIT</Button>
                                            </Link>
                                            <Button className="blog-fl" variant="outline-warning" onClick={e=>handledelete(item.id)}>DELETE</Button>
                                        </div>
                                    }
                                </div>
                                {
                                    item.type==="knowledge"?<div>knowledge</div>:<div></div>
                                }
                            </ListGroup>
                        :
                            <ListGroup variant="flush" className="show-blog">
                                <div>
                                    <Link className="blog-fl" to={`/read${item.type}/${item.id}`}>
                                        <ListGroup.Item><strong>{item.blog_name} {item.user_id}</strong></ListGroup.Item>
                                    </Link>  
                                    {isCanEdit(item.user_id) &&
                                        <div>
                                            <Link to={`/editReview/${item.id}`}>
                                            <Button className="blog-fl" variant="outline-danger" onClick={e=>handleRedirect(item.id)}>EDIT</Button>
                                            </Link>
                                            <Button className="blog-fl" variant="outline-warning" onClick={e=>handledelete(item.id)}>DELETE</Button>
                                        </div>
                                    }
                                </div>
                                {
                                    item.type==="Review"?<div>Review</div>:<div></div>
                                }
                            </ListGroup>
                    }      
                })
            }
        </div>
    );
}

export default UserPage;
