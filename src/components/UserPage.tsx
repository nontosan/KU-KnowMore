// IMPORT LIBRARY //
import React, { useState , Component, useEffect, Suspense } from 'react';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import BlogService from "../services/BlogsService"
import {Blog} from "../interfaces/blog"
import ListGroup from 'react-bootstrap/ListGroup';
import ImageComponent from './DisplayOnProfilePage';
import Card from 'react-bootstrap/Card';
import {
    Link, Redirect,
  } from 'react-router-dom';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import DeleteModal from '../modals/DeleteModal';
import UserAuthor from './UserAuthor';
import ShowLike from './ShowLike';
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import ProfileService from '../services/ProfileService';
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import { User_Sch } from '../interfaces/user';
import {hours} from "../interfaces/hours"
// END OF IMPORT INTERFACE//

// IMPORT CSS //
import './section.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {LikeOutlined,LikeTwoTone,EyeOutlined} from '@ant-design/icons';
import { Popconfirm, message } from 'antd';
import  "./userpage.css"
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
    const [hours,sethours] = useState<hours>();
    const userId:string = props.match.params.userId
    const fetchBlogs=()=>{
        //may use userid from location
        BlogService.fetchBlogfilter(`?userid=${userId}`).then(res=>{
            setBlogs(res)
            //console.log(res)
        })
    }
    const handledelete=(blogId:any)=>{
        BlogService.deleteBlog(blogId).then(res=>{
            if(res!==null){
                const key = 'updatable';
                message.loading({ content: 'Loading...', key });
                setTimeout(() => {
                    message.success({ content: 'Already delete blog', key, duration: 2 });
                }, 1000);
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
    const fetchhour =()=>{
        ProfileService.fetchActivityHour(userId)
            .then(hoursinfo=>{
                console.log(hoursinfo)
                sethours(hoursinfo)
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
        fetchBlogs();
        fetchhour()
    },[])

    useEffect(() => {
        if (UrlLink !== ""){
          console.log(UrlLink);
          setafterSave(!afterSave);
        }
      },[UrlLink]);
    console.log(blogs);
    return (
        <div>
            <div className="userpage-top-div">
                <Suspense  fallback={<div>Loading... </div>}>
                    {userInformation.map(a=>
                        <div className="profile-page-pic blog-fl">
                            <ImageComponent className="profile-in-userpage" size={200} userid={a.pic_dir}/>
                        </div>

                    )}
                </Suspense>
                {userInformation.map(userInformation => (
                    <div className="profile-info blog-fl">
                        <h4 className="y">Name : {userInformation.name}</h4>
                        <h4 className="y">Username : {userInformation.username}</h4>
                        <h4 className="y">Profile Description : {userInformation.profile_description} </h4>
                        <h4 className="y">Activity Hour : {hours?.hours}Hours   {hours?.minutes}minutes   {hours?.seconds}seconds</h4>
                    </div>
                ))}
                <div>
                    {userId == localStorage.userId &&
                    <Link className="blog-fr" to={`/editProfile/${userId}`}>
                        <Button className="blog-fr" variant="danger">EDIT USER INFORMATION</Button>
                    </Link>
                    }
                </div>
            </div>
            <div className="showblog-profilepage" style={{ marginBottom : "50px" }}>
                <Card.Header className="card-header">MY BLOG</Card.Header>
                {blogs.map(blog => {
                    if(blog.user_id==userId){
                        return (
                            <div>
                                {blog.type === "knowledge" ?
                                    <div >
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
                                    :
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
                                            <div className="blog-fl" style={{ textAlign : "center" }}>
                                                <UserAuthor
                                                    userid = {blog.user_id}
                                                />
                                            </div>
                                        </Link>
                                    </div>

                                }
                            </div>
                )}})}
            </div>
            {false &&
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
                                            <Popconfirm
                                                title="Are you sure delete this blog?"
                                                onConfirm={e=>handledelete(item.id)}
                                                onCancel={e=>{console.log("cancle")}}
                                                okText="Yes"
                                                cancelText="No"
                                            ><Button className="blog-fl" variant="outline-warning">DELETE</Button>
                                            </Popconfirm>
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
                                            <Popconfirm
                                                title="Are you sure delete this blog?"
                                                onConfirm={r=>handledelete(item.id)}
                                                onCancel={e=>{console.log("cancle")}}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button className="blog-fl" variant="outline-warning" >DELETE</Button>
                                            </Popconfirm>
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
