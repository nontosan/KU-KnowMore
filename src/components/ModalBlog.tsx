import React,{useState,useEffect}from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Blog, Review } from "../interfaces/blog";
import BlogsService from '../services/BlogsService';
import '../style/section.css'

const ModalBlog = (props:any) => {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [hasError,setErrors] = useState<boolean>(false)
    const [blog,setBlog] = useState<Blog[]>([])

    async function fetchData(){
        const res =  await fetch(`http://188.166.178.33:3000/blogs/${props.rblog.content_id}`)
        res
            .json()
            .then(res => setBlog(res))
            .catch(err => setErrors(err))
        }
        const DeleteBlog = () => {
            BlogsService.deleteReport(props.rblog.id)
            .then(blogs => {
                console.log(blogs)
                console.log("done")
            })
        } 

    useEffect(() =>{ 
        fetchData();
    },[])

    //ชื่อบล็อก
    const blogname = blog.map(name => (name.blog_name))

    return(
        <div className="element ">
            <ListGroup.Item className="blogcontainer" >
            <div className="d-flex " >
                <div className="mr-auto p-2 size-text-report">{blogname}</div>
                <div className="p-2 size-text-report">
                    <a href='#' onClick={handleShow}>
                        &nbsp;Report by: {props.rblog.user_id}&nbsp;
                    </a>
                </div>
                <div className="p-2">
                    <Button className = "button-x"  onClick = {e => DeleteBlog()} >
                             <div className="size-x">X</div>
                    </Button>
                </div>
            </div>
            

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
                            reason: {props.rblog.report_reason}
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
                
            </ListGroup.Item> 
        </div>
    )
}

export default ModalBlog