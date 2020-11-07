import React,{useState,useEffect}from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import FetchReport from '../FetchReport'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Reports_data } from "../../interfaces/reports";
import { Blog, Review } from "../../interfaces/blog";
import { Comment_Sch } from "../../interfaces/comment";

const ViewComment_Modal = (props:any) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [hasError,setErrors] = useState<boolean>(false)
    const [commentData,setComment] = useState<Comment_Sch[]>([])
    const [blog,setBlog] = useState<any[]>([])

    async function fetchComment(){
        const res =  await fetch(`https://backend.ku-knowmore.xyz/blogs/${props.rblog.content_id}/comments`)
        res
            .json()
            .then(res => setComment(res))
            .catch(err => setErrors(err))
    }
    async function fetchBlog(){
        const res =  await fetch(`https://backend.ku-knowmore.xyz/blogs/${props.rblog.content_id}`)
        res
            .json()
            .then(res => setBlog(res))
            .catch(err => setErrors(err))
    }

    useEffect(() =>{ 
        fetchComment();
        fetchBlog();
    },[])
    //ชื่อบล็อก
    const blogname = blog.map(name => (name.blog_name))
    //split reason
    let reason = props.rblog.report_reason.split(',')
    const newreason = reason.slice(0, reason.length - 1);
    //show Reported comment 
    const thiscomment = commentData.map(a => a.content);

    return(
        <div className="element"> 
            <a className="t" href='#' onClick={handleShow}>
                {blogname} 
            </a> 
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Title id="contained-modal-title-vcenter">
                        Report
                    </Modal.Title>
                    <Modal.Body> 
                        <div>
                            {newreason.map((r:any)=>(
                                <ListGroup.Item variant="danger">
                                    reason: {r}
                                </ListGroup.Item>
                            ))}
                        </div>
                        <div>
                            Comment : {props.report_string}
                        </div>                        
                        <ListGroup.Item variant="danger">
                            {thiscomment}
                        </ListGroup.Item>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Link to= {`/read${props.rblog.content_type}/${props.rblog.content_id}`}>
                            <Button variant="primary">View Blog</Button>
                        </Link>
                    </Modal.Footer>
                </Modal>
            
            
        </div>
    )
}

export default ViewComment_Modal;