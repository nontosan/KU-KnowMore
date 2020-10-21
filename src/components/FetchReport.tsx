import React,{useState,useEffect}from 'react';
import { ListGroup, NavLink } from 'react-bootstrap';
import { Reports_data } from "../interfaces/reports";
import { Blog, Review } from "../interfaces/blog";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from 'react-router-dom';
import Routing from '../routes/index'

const FetchReport = () => {

    const [hasError,setErrors] = useState<boolean>(false)
    const [reportedBlog,setReport] = useState<Reports_data[]>([])
    const [DataBlog,setBlog] = useState<Blog[]>([])
    /*const [DataBlog_RV,setBlogRV] = useState<Review[]>([])*/
    
    async function fetchDataRe(){
        const res =  await fetch("http://188.166.178.33:3000/reports/")
        res
            .json()
            .then(res => setReport(res))
            
            .catch(err => setErrors(err))
    }
    async function fetchDataBlogRV(){
        const res =  await fetch(`http://188.166.178.33:3000/blogs/search/?type=2`)
        res
            .json()
            .then(resp => setBlog(resp))
            .catch(errb => setErrors(errb))
    }

    useEffect(() =>{ 
        fetchDataRe();
        fetchDataBlogRV();
    },[])

    const DeleteBlog = () => {
        console.log('This blog was deleted')
    }


    const listreport = reportedBlog.map(rblog => (
        <ListGroup.Item className="blogcontainer" >
            <div className="element"> 
            <Link to= {`/readReview/${rblog.content_id}`}>
                <Button > View</Button>
            </Link>
            {rblog.content_id} 
            </div>
        </ListGroup.Item>
        
    ))

    const listdata = DataBlog.map(blog => (
        <ListGroup.Item className="blogcontainer" >
            <div className="element">                        
            <Link to= {`/readReview/${blog.id}`}>
                <Button > View</Button>
            </Link>
            {blog.id} ,
            {blog.course_id} ,
            {blog.blog_name} ,
            {blog.type}
            </div>
        </ListGroup.Item>
    ))
    const Fuck = () => {
        if (listdata === listreport)
        {
            console.log('id = id')
        }
        console.log('Fuck',{listreport},{listdata})
    }
    
    
    return(
        <div>
            <button onClick = {Fuck}> Check </button>
            
            <h1>Report</h1>
            {listreport}
            <h1>BlogRV</h1>
            {listdata}
            
        </div>
    )
};

export default FetchReport 
