// IMPORT LIBRARY //
import React,{useState,useEffect,useCallback} from "react";
import { useParams } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import UserCommentAuthor from "./UserCommentAuthor";
import UserCommentName from "./userincomment/username"
import UserCommentPic from "./userincomment/userpic"
// END OF IMPORT COMPONENT //

// IMPORT SERVICE //
import loadcomment from "../services/loadcomment";
import CommentService from "../services/CommentService";

// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import {Comment_Sch} from "../interfaces/comment";
import { User_Sch } from "../interfaces/user";
// END OF IMPORT INTERFACE//

import ReportButton from '../photo/more (1).png';
import 'antd/dist/antd.css';
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import "./comment.css" 
//------------------------------------------------------------------//

import {Formik,Form,Field,ErrorMessage} from "formik";


type comment_loaded={
    comments:Comment_Sch
}
type user_loaded={
    users:User_Sch
}
type comment_blog={
    comment_id:string;
    blog_id:string;
    user_id:string;
    content:string;
    date_time:Date;
    profile_description?:string;
    pic_name?:string;
    username?:string;
    pic_dir?:string;
}

const Comment_component=(props:any)=>{
    const [comments,setcomment] = useState<Comment_Sch[]>([])
    const [user,setuser] = useState<User_Sch>()
    const [deleteVisible,setdelete] = useState<boolean>(false)
    /*const [cmt_blogs,setcmt_blog] = useState<comment_blog[]>([]);*/
    const cmt_blogs:comment_blog[] = []
    //const blog_id
    const blogId:string = window.location.pathname.split("/")[2]

    const fetchblog=()=>{
    }

    //load comment form database

    const fetchCommentblog=()=>{
        CommentService.fetchComment(props.blogId)
            .then(comments => {
                console.log(comments);
                setcomment(comments)
            });
    }
    

    const handledelete=()=>{
        console.log("handledelete comment")
    }

    const handlereport=()=>{
        console.log("handlereport comment")
        //popup form
        //https://www.youtube.com/watch?v=l2Kp2SzUdlg&ab_channel=Weibenfalk[!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
    }

    useEffect(()=>{
        fetchCommentblog()
        //console.log("HELLOEIEIZACOMMENT");
        //check is token id is userid then set deleteVisible ??[!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
    },[])

    //DOM

    return (
        <div>
            {comments.map(item=>(
                <div className="show-all-comment">
                    <div className="blog-fl black-font">
                        <UserCommentAuthor 
                            userid = {item.user_id}
                        />
                    </div>
                    <div className="blog-fl black-font">
                        {item.content}    
                    </div>
                    <div className="blog-fl black-font">
                        {item.date_time}
                    </div>
                    <div className="blog-fr">
                        {item.user_id==localStorage.userId &&
                            <NavDropdown className="dropdown-eiei blog-fr" title={
                                <div className="border-more-pic">
                                    <Image className="more-pic blog-fr" src={ReportButton}></Image>
                                </div>
                                } id="dropdown-nav" >
                                <NavDropdown.Item onClick={handledelete} className="more-option">Delete</NavDropdown.Item>
                                <NavDropdown.Item onClick={handlereport} className="more-option">Report</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </div>
                </div>
            ))}
            <Formik
            initialValues={{CommentContent:"",errorMess:""}}
            validate={(value)=>{
                const errors:any={};
                if(value.CommentContent===""){
                    errors.errorMess="noCommentdata";
                }
                return errors
            }}
            onSubmit={(values,actions)=>{
                const cont:any={
                        blog_id:blogId,
                        user_id:"5f82fd2e04eb8600aa617b66",
                        content:values.CommentContent,
                    }
                if(values.CommentContent!==""){
                    //console.log(cont)
                    CommentService.createComment(cont)
                        .then(res=>{
                            console.log('eiei')
                            fetchCommentblog()
                        })
                }
                else{
                    actions.setSubmitting(true)
                }
                actions.setSubmitting(false)
                values.CommentContent=""
            }}
            >
            {({isSubmitting})=>(
                <Form autoComplete="off">
                    <div className="Blog_frame1 content_container">
                        <div className="cont">
                            <Field type="input" className="input" name="CommentContent" placeholder="type something..."/>
                            <ErrorMessage name="errorMess" component="div"/>
                        </div>
                    </div>
                    <button disabled={isSubmitting}> send </button>
                </Form>
            )}
        </Formik>
        </div>
    )
}

export default Comment_component