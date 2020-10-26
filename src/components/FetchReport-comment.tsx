import React,{useState,useEffect}from 'react';
/* INTERFACE */
import { Reports_data } from "../interfaces/reports";
/* BOOTSTRAP */
import 'bootstrap/dist/css/bootstrap.min.css';
/* MODAL */
import Modalcomment from './Modalcomment';


const FetchReport_comment = () => {

    const [hasError,setErrors] = useState<boolean>(false)
    const [reportedBlog,setReport] = useState<Reports_data[]>([])
    
    async function fetchReport(){
        const res =  await fetch("http://188.166.178.33:3000/reports/")
        res
            .json()
            .then(res => setReport(res))
            .catch(err => setErrors(err))
    }
    
    useEffect(() =>{ 
        fetchReport();
    },[])
    
    let Listreport_comment = reportedBlog.filter(blog => blog.content_type === 'comment');
   
    const Modalreport_comment = Listreport_comment.map(rblog => (
        <Modalcomment rblog ={rblog} />
    ))
    
    return(
        <div>
            <h3>Comment</h3> <br></br>
            {Modalreport_comment}
        </div>
    )
};

export default FetchReport_comment

