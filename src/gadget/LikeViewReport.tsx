import React, { useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/createblog_component/input.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import LikeServive from "../services/LikeService"
import BlogService from "../services/BlogsService"
import beforeLike from '../photo/like.png';
import afterLike from "../photo/like.jpg"
import Viewer from '../photo/viewer.png';
import Alert from '../photo/alert.png';
import {Like} from "../interfaces/Like"
import {Blog} from "../interfaces/blog"
import ReportModal from "../modals/report"
import {LikeOutlined,LikeTwoTone,EyeOutlined} from '@ant-design/icons';
import "./gadgetclass.css"


const LikeViewReport=(props:any)=> {
    const [like,setLike] = useState<boolean>(false)
    const [liker ,setliker] = useState<Like[]>([]) 
    const [bloginfo,setbloginfo] = useState<Blog[]>([])
    const blogId = window.location.pathname.split("/")[2]
    const fetchBlog=()=>{
        BlogService.fetchBlogSpecific(blogId).then(res=>{
            setbloginfo(res)
        })
    }
    const fetchLiker=()=>{
        LikeServive.fetchLike(blogId).then(res=>{
            setliker(res)
        })
    }
    const clicklike=async()=>{
        const data:any={
            //sending userid of token
            user_id:localStorage.userId,
            //blog_id:blogId
        }
        LikeServive.createLike(blogId,data).then(res=>{
            console.log(res)
            setLike(res)
        })
    }
  
    useEffect(() => {
        fetchBlog()
        fetchLiker()
        //clicklike()
    },[]);

    return (
        <div>
            <div className="hot-kl">
                <Card.Header className="likeviewreportContainer">
                    <div className="like">
                        {like ? <button className="likebutton" onClick={clicklike}><LikeOutlined /></button> : <button className="likebutton" onClick={clicklike}><LikeTwoTone /></button> }
                        &nbsp;&nbsp;<div style={{ display: "inline" }} className="liketotal">{liker.length}</div>
                    </div>
                    <div className="like" >
                        &nbsp;&nbsp;&nbsp;&nbsp;<EyeOutlined />{bloginfo.map(x=>(<div style={{ display: "inline" }}>&nbsp;&nbsp;{x.viewers}</div>))}
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;<ReportModal/>
                </Card.Header>
            </div>
        </div>
    );
}
export default LikeViewReport;