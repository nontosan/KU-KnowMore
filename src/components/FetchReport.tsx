import React,{useState,useEffect}from 'react';
import { ListGroup, NavLink } from 'react-bootstrap';
import { Reports_data } from "../interfaces/reports";
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
    
    async function fetchData(){
        const res =  await fetch("http://188.166.178.33:3000/reports/")
        res
            .json()
            .then(res => setReport(res))
            .catch(err => setErrors(err))
    }

    useEffect(() =>{ 
        fetchData();
    },[])

    const ReadUserBlog = (a: any) => {
        const params = useParams()
        console.log('param = ',params)
        return {a}
    }
    

    const DeleteBlog = () => {
        console.log('This blog was deleted')
    }

    return(
        <div>
            <h2>Reported Blog</h2>
                {reportedBlog.map(blog => (
                    <ListGroup.Item className="blogcontainer" >
                        <div className="element">
                            <Link to="/${blog.id }">
                                {blog.id}
                                {/**{ReadUserBlog(blog.id)}*/}
                            </Link>
                            <button onClick = {DeleteBlog}>
                                Delete
                            </button>
                        </div>
                    </ListGroup.Item>
                ))}
        </div>
    )
};

export default FetchReport   