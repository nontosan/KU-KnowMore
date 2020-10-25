import React,{useState,useEffect}from 'react';
import { ListGroup, NavLink } from 'react-bootstrap';
import { Reports_data } from "../interfaces/reports";
import { Blog, Review } from "../interfaces/blog";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import BlogsService from "../services/BlogsService"
import ModalAuy from "../components/ModalAuy"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from 'react-router-dom';


const FetchReport = () => {

    const [hasError,setErrors] = useState<boolean>(false)
    const [reportedBlog,setReport] = useState<Reports_data[]>([])
    const [DataBlog,setBlog] = useState<Blog[]>([])
    
    async function fetchDataRe(){
        const res =  await fetch("http://188.166.178.33:3000/reports/")
        res
            .json()
            .then(res => setReport(res))
            .catch(err => setErrors(err))
    }
    async function fetchDataBlogRV(){
        const res =  await fetch("http://188.166.178.33:3000/blogs/")
        res
            .json()
            .then(resp => setBlog(resp))
            .catch(errb => setErrors(errb))
    }
    
    

    useEffect(() =>{ 
        fetchDataRe();
        fetchDataBlogRV();

    },[])
        
    let Listreport_review = reportedBlog.filter(blog => blog.content_type === 'review');
    let Listreport_knowledge = reportedBlog.filter(blog => blog.content_type === 'knowledge');
    let Listreport_comment = reportedBlog.filter(blog => blog.content_type === 'comment');
    
    const Modalreport_review = Listreport_review.map(rblog => (
        <ModalAuy rblog={rblog} />
    ))

    const Modalreport_knowledge = Listreport_knowledge.map(rblog => (
        <ModalAuy rblog={rblog} />
    ))
    
    const Modalreport_comment = Listreport_comment.map(rblog => (
        <ModalAuy rblog ={rblog} />
    ))



    
/*
    const blogname = () => { reportedBlog.map(a=>{
        console.log(a.content_id)
        DataBlog.map(b=>{
            if(a.content_id === b.id)
                {
                ilovethis.push(b.blog_name)
                console.log(b.id)
                console.log("ok")
                }
            console.log("not match")
        })
    })}
    console.log(ilovethis)
*/
    
    return(
        <div>
            <h1>Report List</h1><br></br>
            <h3>Review</h3> <br></br>
            {Modalreport_review}
            <h3>Knowledge</h3> <br></br>
            {Modalreport_knowledge}
            <h3>Comment</h3> <br></br>
            {Modalreport_comment}
            
        </div>
    )
};

export default FetchReport