import React, { useState , useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/createblog_component/input.css';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import LikeServive from "../services/LikeServive"
import BlogService from "../services/BlogsService"
import beforeLike from '../photo/like.png';
import afterLike from "../photo/like.jpg"
import Viewer from '../photo/viewer.png';
import Alert from '../photo/alert.png';
import {Like} from "../interfaces/Like"
import {Blog} from "../interfaces/blog"
import ReportModal from "../modals/report"
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
            blog_id:blogId,
            //sending userid of token
            user_id:"5f82fd5504eb8600aa617b6b",
        }
        const likestate = await LikeServive.createLike(blogId,data)
        setLike(likestate)
    }
    useEffect(() => {
        fetchBlog()
        fetchLiker()
        clicklike()
    },[]);

    return (
        <div>
            <div className="hot-kl">
                <Card.Header>
                    {like ? <button onClick={clicklike}><Image className="likebar-pic" src={afterLike} /></button> : <button onClick={clicklike}><Image className="likebar-pic" src={beforeLike} /></button> }
                    <div>{liker.length}</div>
                    <Image className="likebar-pic" src={Viewer} />{bloginfo.map(x=>(<div>{x.viewers}</div>))}
                    <ReportModal />
                </Card.Header>
            </div>
        </div>
    );
}
export default LikeViewReport;