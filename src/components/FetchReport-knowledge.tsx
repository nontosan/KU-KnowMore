import React,{useState,useEffect}from 'react';
/* INTERFACE */
import { Reports_data } from "../interfaces/reports";
/* BOOTSTRAP */
import 'bootstrap/dist/css/bootstrap.min.css';
/* MODAL */
import ModalBlog from './ModalBlog';

const FetchReport_knowledge = () => {

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
    
    let Listreport_knowledge = reportedBlog.filter(blog => blog.content_type === 'knowledge');
    
    const Modalreport_knowledge = Listreport_knowledge.map(rblog => (
        <ModalBlog rblog={rblog} />
    ))
    return(
        <div>
            <h3>Knowledge</h3> <br></br>
            {Modalreport_knowledge}
        </div>
    )
};

export default FetchReport_knowledge