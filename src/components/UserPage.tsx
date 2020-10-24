// IMPORT LIBRARY //
import React, { useState , Component, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';
import BlogService from "../services/BlogsService"
import {Blog} from "../interfaces/blog"
import ListGroup from 'react-bootstrap/ListGroup';

import {
    Link, Redirect,
  } from 'react-router-dom';
// END OF IMPORT LIBRARY //

// IMPORT SERVICE //
import SectionService from '../services/SectionService';
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

    useEffect(() => {
        fetchProfile();
        fetchBlogs()
    },[])

    return (
        <div>
            <Form inline className="main-div">
                <div>
                    <Image className="profile-page-pic" src={ProfilePic} roundedCircle />
                </div>
                {userInformation.map(userInformation => (
                    <div className="profile-info">
                        <h4>Name : {userInformation.name}</h4>
                        <h4>Username : {userInformation.username}</h4>
                        <h4>Profile Description : {userInformation.profile_description} </h4>
                        <h4>Activity : </h4>
                    </div>
                ))}
            </Form>
            {
                blogs.map((item:Blog)=>{
                    return checktype(item.type)?
                        <ListGroup variant="flush" className="show-blog">
                            <Link to={`/readknowledge/${item.id}`}>
                                <ListGroup.Item><strong>{item.blog_name}</strong></ListGroup.Item>
                            </Link>
                            <Button variant="outline-danger">EDIT</Button>
                            <Button variant="outline-warning" onClick={e=>handledelete(item.id)}>DELETE</Button>
                        </ListGroup>
                    :
                        <ListGroup variant="flush" className="show-blog">
                            <Link to={`/readSection/${item.id}`}>
                                <ListGroup.Item><strong>{item.blog_name}</strong></ListGroup.Item>
                            </Link>  
                            <Button variant="outline-danger">EDIT</Button>
                            <Button variant="outline-warning" onClick={e=>handledelete(item.id)}>DELETE</Button>
                        </ListGroup>
                        
                })
            }

            <Link to="/editProfile">
                <Button variant="outline-danger">EDIT</Button>
            </Link>
        </div>
    );
}

export default UserPage;
