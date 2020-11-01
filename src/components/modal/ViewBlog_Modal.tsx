import React,{useState,useEffect}from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import FetchReport from '../FetchReport'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Reports_data } from "../../interfaces/reports";
import { Blog, Review } from "../../interfaces/blog";
import BlogsService from '../../services/BlogsService';

const ViewBlog_Modal = (props:any) => {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [hasError,setErrors] = useState<boolean>(false)
    const [blog,setBlog] = useState<Blog[]>([])

    async function fetchData(){
        const res =  await fetch(`https://backend.ku-knowmore.xyz/blogs/${props.rblog.content_id}`)
        res
            .json()
            .then(res => setBlog(res))
            .catch(err => setErrors(err))
        }

    useEffect(() =>{ 
        fetchData();
    },[])

    //ชื่อบล็อก
    const blogname = blog.map(name => (name.blog_name))

    let reason = props.rblog.report_reason.split(',')
    const newreason = reason.slice(0, reason.length - 1);

    return(
        <div className="mr-auto p-2 size-text-report">
            <a href='#' onClick={handleShow}>
                {blogname} 
            </a>  
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    Report
                </Modal.Title>
                <Modal.Body> 
                    <ListGroup.Item>
                    <div>
                        {newreason.map((r:any)=>(
                        <ListGroup.Item>
                            reason: {r}
                        </ListGroup.Item>))}
                    </div>
                    <div>
                        {props.report_string}
                    </div>
                    </ListGroup.Item>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <ListGroup.Item>
                        <Link to= {`/read${props.rblog.content_type}/${props.rblog.content_id}`}>
                            <Button>View Blog</Button>
                        </Link>
                    </ListGroup.Item>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ViewBlog_Modal