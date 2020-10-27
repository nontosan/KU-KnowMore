// IMPORT LIBRARY //
import React, { useState , Component, useEffect, Suspense } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import BlogService from "../services/BlogsService"
import {Blog} from "../interfaces/blog"
import ListGroup from 'react-bootstrap/ListGroup';
import ImageComponent from './Display';

import {
    Link, Redirect,
  } from 'react-router-dom';
// END OF IMPORT LIBRARY //

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

    useEffect(() => {
        fetchProfile();
        fetchBlogs()
    },[])

    return (
        <div>
            <div className="main-div">
                <Suspense fallback={<div>Loading... </div>}>
                    {userInformation.map(a=>
                    <ImageComponent userid={a.pic_dir}/>)}
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
            {
                blogs.map((item:Blog)=>{
                    return checktype(item.type)?
                        <ListGroup variant="flush" className="show-blog">
                            <div >
                                <Link className="blog-fl" to={`/readknowledge/${item.id}`}>
                                    <ListGroup.Item><strong>{item.blog_name} {item.user_id}</strong></ListGroup.Item>
                                </Link>
                                {isCanEdit(item.user_id) &&
                                    <div>
                                        <Button className="blog-fl" variant="outline-danger">EDIT</Button>
                                        <Button className="blog-fl" variant="outline-warning" onClick={e=>handledelete(item.id)}>DELETE</Button>
                                    </div>
                                }
                            </div>
                        </ListGroup>
                    :
                        <ListGroup variant="flush" className="show-blog">
                            <div>
                                <Link className="blog-fl" to={`/readreview/${item.id}`}>
                                    <ListGroup.Item><strong>{item.blog_name} {item.user_id}</strong></ListGroup.Item>
                                </Link>  
                                {isCanEdit(item.user_id) &&
                                    <div>
                                        <Button className="blog-fl" variant="outline-danger">EDIT</Button>
                                        <Button className="blog-fl" variant="outline-warning" onClick={e=>handledelete(item.id)}>DELETE</Button>
                                    </div>
                                }
                            </div>
                            
                        </ListGroup>
                        
                })
            }
        </div>
    );
}

export default UserPage;
