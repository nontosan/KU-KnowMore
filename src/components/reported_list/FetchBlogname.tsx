import React,{useState,useEffect}from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import BlogsService from '../../services/BlogsService';
import { Blog } from '../../interfaces/blog';
import ViewBlog_Modal from '../modal/ViewBlog_Modal';
import DelReport_Modal from '../modal/DelReport_Modal';
import ViewComment_Modal from '../modal/ViewComment_Modal';

const FetchBlogname = (props:any) => {
    
    const [hasError,setErrors] = useState<boolean>(false)
    const [blog,setBlog] = useState<Blog[]>([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    async function fetchData(){
        const res =  await fetch(`https://backend.ku-knowmore.xyz/blogs/${props.rblog.content_id}`)
        res
            .json()
            .then(res => setBlog(res))
            .catch(err => setErrors(err))
    }

    useEffect(() =>{ 
        fetchData();
    },[])

    return (
        <div>
            <ListGroup.Item className="blogcontainer" >
                <div className="d-flex" > 
                    <div className ="mr-auto p-2">
                    {(props.rblog.content_type!='comment')
                        ? <ViewBlog_Modal rblog = {props.rblog}/>
                        : <ViewComment_Modal rblog = {props.rblog}/>
                    }
                    </div>
                    <div className="p-2 size-text-report">
                        Reported by: {props.rblog.user_id}&nbsp;
                    </div>
                    <div className="p-2 cancel-button">
                        <DelReport_Modal rblog = {props.rblog}/> 
                    </div>
                </div>
            </ListGroup.Item>
        </div>
    )
}

export default FetchBlogname;