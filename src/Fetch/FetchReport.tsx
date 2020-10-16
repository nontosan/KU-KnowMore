import React,{useState,useEffect}from 'react';
import { Reports_data } from "../interfaces/reports";

const FetchReport = () => {

    const [hasError,setErrors] = useState(false)
    const [reportedBlog,setReport] = useState({})
    
    async function fetchData(){
        const res =  await fetch("http://188.166.178.33:3000/reports/")
        res
            .json()
            .then(res => setReport(res.id))
            .catch(err => setErrors(err))
    }

    useEffect(() =>{ 
        fetchData();
    },[])

    return(
        <div>
            {JSON.stringify(reportedBlog)}
            {console.log(reportedBlog)}
            <br/>
            {JSON.stringify(hasError)}
        </div>
    )
};

export default FetchReport   