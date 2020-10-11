import React,{useEffect, useState} from 'react';
import './input.css'

const Input_Subject = (props: any) => {
    const [hasError, setErrors] = useState(false)
    const [subject, setSubject] = useState('')

    async function fetchData(){
        const res = await fetch('/{props.coursecode}');
        res
            .json()
            .then(res=>setSubject(res))
            .catch(err=>setErrors(err))
    }

    useEffect(()=> {
        fetchData();
    })

    return(
        <div className="Blog_frame2">
            <label className="Blog_name" htmlFor="InputSubject">วิชา</label>
            <div className="Blog_name3" >
                {JSON.stringify(subject)}
            </div>
        </div>
    )
}
    
export default Input_Subject;