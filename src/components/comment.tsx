// IMPORT LIBRARY //
import React,{useState,useEffect,useCallback} from "react";
import { useParams } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import NavDropdown from 'react-bootstrap/esm/NavDropdown';
// END OF IMPORT LIBRARY //

// IMPORT COMPONENT //
import DeleteCommentModal from '../modals/DeleteCommentModal';
import UserCommentAuthor from "./UserCommentAuthor";
import UserCommentName from "./userincomment/username"
import UserCommentPic from "./userincomment/userpic"
import ReportCmtModal from "../modals/report_cmt"
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

    
    //CONST FOR DELETE MODAL//
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [statusDelete, setStatusDelete] = useState<boolean>(false);
    const [deleteCommentId, setDeleteCommentId] = useState<string>('');
    //END OF CONST FOR DELETE MODAL//

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
    

    const handleDeleteComment=(commentId:string)=>{
        console.log(commentId);
        setShowDeleteModal(true);
        setDeleteCommentId(commentId);
    }

    const handlereport=()=>{
        if(localStorage.accessToken==undefined){
            alert('PLEASE LOGIN FIRST')
        }
        console.log("handlereport comment")
        //popup form
        //https://www.youtube.com/watch?v=l2Kp2SzUdlg&ab_channel=Weibenfalk[!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
    }

    const submitDeleteComment = () => {
        setShowDeleteModal(false);
        console.log(deleteCommentId);
        CommentService.deleteComment(deleteCommentId)
            .then(res => {
                if (res) {
                    setStatusDelete(true);
                }
                console.log(res);
            })
    }

    const closeModal = () => {
        setShowDeleteModal(false);
        console.log('eiei')
    }

    
    useEffect(()=>{
        fetchCommentblog()
        //console.log("HELLOEIEIZACOMMENT");
        //check is token id is userid then set deleteVisible ??[!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
    },[])

    useEffect(() => {
        if (statusDelete==true) {
          fetchCommentblog();
          setStatusDelete(false);
        }
      },[statusDelete]);
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
                    {item.user_id==localStorage.userId &&
                    <div className="blog-fr">
                        
                            <NavDropdown className="dropdown-eiei blog-fr" title={
                                <div className="border-more-pic">
                                    <Image className="more-pic blog-fr" src={ReportButton}></Image>
                                </div>
                                } id="dropdown-nav" >
                                {item.user_id==localStorage.userId &&
                                    <NavDropdown.Item onClick={() => handleDeleteComment(item.id)} className="more-option">Delete</NavDropdown.Item>
                                }
                                {showDeleteModal && 
                                    <div>
                                        <DeleteCommentModal 
                                            show = {showDeleteModal}
                                            contentq = {item.content}
                                            deleteComment = {submitDeleteComment}
                                            closenaja = {closeModal}
                                        />
                                    </div>
                                }
                                {false &&
                                    <ReportCmtModal 
                                        id={item.id}
                                        blogid={item.blog_id}
                                        content={item.content}
                                        datetime={item.date_time}
                                        userid={item.user_id}
                                />
                                }
                            </NavDropdown>
                    </div>}
                </div>
            ))}
            {localStorage.accessToken!==undefined &&
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
                        user_id:localStorage.userId,
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
                    <div >
                        <button disabled={isSubmitting} className="btn btn-success send-button"> send </button>
                        <div style={{color:"white"}}>
                            <Field type="input" className="input" name="CommentContent" placeholder="type something..."/>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
            }
            
        </div>
    )
}

export default Comment_component