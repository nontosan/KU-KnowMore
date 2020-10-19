import React,{useState,useEffect}from 'react';
import { ListGroup, NavLink } from 'react-bootstrap';
import { Reports_data } from "../interfaces/reports";
import { Blog } from "../interfaces/blog";
import 'bootstrap/dist/css/bootstrap.min.css';
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
    
    async function fetchDataRe(){
        const res =  await fetch("http://188.166.178.33:3000/reports/")
        res
            .json()
            .then(res => setReport(res))
            .catch(err => setErrors(err))
    }
    async function fetchDataBlog(){
        const res =  await fetch("http://188.166.178.33:3000/blogs/")
        res
            .json()
            .then(resp => setBlog(resp))
            .catch(errb => setErrors(errb))
    }

    useEffect(() =>{ 
        fetchDataRe();
        fetchDataBlog();
    },[])

    const DeleteBlog = () => {
        console.log('This blog was deleted')
    }


    const listreport = reportedBlog.map(rblog => (
        <ListGroup.Item className="blogcontainer" >
            <div className="element">                        
                    {rblog.id}
            </div>
        </ListGroup.Item>
    ))

    const listdata = DataBlog.map(blog => (
        <ListGroup.Item className="blogcontainer" >
            <div className="element">                        
                    {blog.id}
            </div>
        </ListGroup.Item>
    ))
    const Fuck = () => {
        if (listdata === listreport)
        {
            console.log('id = id')
        }
        console.log('Fuck')
    }
    
    
    return(
        <div>
            <button onClick = {Fuck}> Check </button>
            {listreport}
            <h1>Data</h1>
            {listdata}
            
        </div>
    )
};

export default FetchReport 