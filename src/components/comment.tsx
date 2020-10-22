// IMPORT LIBRARY //
import React,{useState,useEffect,useCallback} from "react"
import { useParams } from "react-router-dom"
// END OF IMPORT LIBRARY //

// IMPORT SERVICE //
import loadcomment from "../services/loadcomment"
import loaduser from "../services/loaduser"
// END OF IMPORT SERVICE //

// IMPORT INTERFACE //
import {Comment_Sch} from "../interfaces/comment"
import { User_Sch } from "../interfaces/user"
// END OF IMPORT INTERFACE//

//------------------------------------------------------------------//

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

const Comment_component=()=>{
    const [comments,setcomment] = useState<Comment_Sch[]>([])
    const [user,setuser] = useState<User_Sch>()
    const [deleteVisible,setdelete] = useState<boolean>(false)
    /*const [cmt_blogs,setcmt_blog] = useState<comment_blog[]>([]);*/
    const cmt_blogs:comment_blog[] = []
    //const blog_id
    
    const fetchblog=()=>{

    }
    //load comment form database
    const fetchCommentblog=()=>{
        loadcomment.fetchComment().then(comments=>{setcomment(comments)})
        comments.forEach((comment)=>{
            loaduser.fetchUser(comment).then(user=>setuser(user))
            const cmt_blog:comment_blog={
                    comment_id:comment.blog_id,
                    blog_id:comment.blog_id,
                    user_id:comment.user_id,
                    content:comment.content,
                    date_time:comment.date_time,
                    profile_description:user?.profile_description,
                    pic_name:user?.pic_name,
                    username:user?.username,
                    pic_dir:user?.pic_dir
            }
            /*setcmt_blog(cmt_blogs)*/
            cmt_blogs.push(cmt_blog)
            
        })
    }

    
    const handledelete=()=>{
        console.log("handledelete comment")
    }

    const handlereport=()=>{
        console.log("handle report")
        //popup form
        //https://www.youtube.com/watch?v=l2Kp2SzUdlg&ab_channel=Weibenfalk[!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
    }

    useEffect(()=>{
        fetchCommentblog()
        //check is token id is userid then set deleteVisible ??[!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
    },[])

    //DOM

    return (
        <div>
            <div>Comment</div>
            {cmt_blogs.map(item=>(
                <div>
                    <img src={item.pic_dir}></img>
                    <div>{item.username}</div>
                    <div>{item.content}</div>
                    <div>{item.date_time}</div>
                    {deleteVisible &&
                        <button onClick={handledelete}>delete</button>
                    }
                    <button onClick={handlereport}>report</button> 
                </div>
            ))}
        </div>
    )
}