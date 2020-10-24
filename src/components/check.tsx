import React,{useState,useEffect}from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import FetchReport from './FetchReport'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Reports_data } from "../interfaces/reports";
import { Blog, Review } from "../interfaces/blog";

const Check = (props:any) => {
    const [reportedBlog,setReport] = useState<Reports_data[]>([])
    const [DataBlog,setBlog] = useState<Blog[]>([])

    async function fetchDataRe(){
        const res =  await fetch("http://188.166.178.33:3000/reports/")
        res
            .json()
            .then(res => setReport(res))
    }
    async function fetchDataBlogRV(){
        const res =  await fetch("http://188.166.178.33:3000/blogs/")
        res
            .json()
            .then(resp => setBlog(resp))
    }
    
    useEffect(() =>{ 
        fetchDataRe();
        fetchDataBlogRV();
    },[])
    return(
        reportedBlog.map(a=>
            {
                DataBlog.map(b=>{
                    if(a.content_id === b.id)
                    {
                        props.list.push(b.blog_name)
                        {props.list}
                    }
                })
            })
    )
}
export default Check