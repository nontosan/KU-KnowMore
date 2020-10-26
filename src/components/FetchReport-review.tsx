import React,{useState,useEffect}from 'react';
/* INTERFACE */
import { Reports_data } from "../interfaces/reports";
/* BOOTSTRAP */
import 'bootstrap/dist/css/bootstrap.min.css';
/* MODAL */
import ModalBlog from './ModalBlog';

const FetchReport_review = () => {

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
    
    let Listreport_review = reportedBlog.filter(blog => blog.content_type === 'review');
    
    const Modalreport_review = Listreport_review.map(rblog => (
        <ModalBlog rblog={rblog} />
    ))
    return(
        <div>
            <h3>Review</h3> <br></br>
            {Modalreport_review}
        </div>
    )
};

export default FetchReport_review