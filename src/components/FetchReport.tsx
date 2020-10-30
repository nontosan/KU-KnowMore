import React,{useState,useEffect}from 'react';
import { Reports_data } from "../interfaces/reports";
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewBlog_Modal from './modal/ViewBlog_Modal';
import ViewComment_Modal from './modal/ViewComment_Modal';
import FetchBlogname from './reported_list/FetchBlogname';


const FetchReport = (props:any) => {

    const [hasError,setErrors] = useState<boolean>(false)
    const [reportedBlog,setReport] = useState<Reports_data[]>([])

    async function fetchReport(){
        const res =  await fetch("http://188.166.178.33:3000/reports/")
        res
            .json()
            .then(res => setReport(res))
            .catch(err => setErrors(err))
    }
    
    useEffect(() => { 
        fetchReport();
    },[])

    const type =  props.content
    let list = reportedBlog.filter(blog => blog.content_type === type)
    const report_list = list.map(rblog => (
        <div> 
            <FetchBlogname rblog={rblog}/>
        </div>
    ))

    return (
      <div>
        {report_list}
      </div>  
    )
}
export default FetchReport;


