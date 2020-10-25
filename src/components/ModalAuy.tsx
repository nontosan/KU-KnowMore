import React,{useState,useEffect}from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import FetchReport from './FetchReport'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Reports_data } from "../interfaces/reports";
import { Blog, Review } from "../interfaces/blog";
import { Comment_Sch } from "../interfaces/comment";
import BlogsService from "../services/BlogsService"

const ModalAuy = (props:any) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [hasError,setErrors] = useState<boolean>(false)
    const [commentData,setComment] = useState<Blog[]>([])
    async function fetchData(){
        const res =  await fetch(`http://188.166.178.33:3000/blogs/${props.rblog.content_id}`)
        res
            .json()
            .then(res => setComment(res))
            .catch(err => setErrors(err))
        }
        const DeleteBest = () => {
            BlogsService.deleteReport(props.rblog.id)
            .then(blogs => {
                console.log(blogs)
                console.log("done")
            })
        } 
    useEffect(() =>{ 
        fetchData();
    },[])
    

    console.log(commentData)
    return(
        <div className="element"> 
                <a href='#' onClick={handleShow}>
                    
                    {commentData.map(data => (
                        
                            <ListGroup.Item>
                                {data.blog_name}
                            </ListGroup.Item>
                        ))}
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
                        <div>
                            {props.rblog.report_reason}
                        </div>
                        <div>
                            {props.report_string}
                        </div>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <ListGroup.Item>
                            <Link to= {`/readReview/${props.rblog.content_id}`}>
                                <Button>View</Button>
                            </Link>
                        </ListGroup.Item>
                        
                    </Modal.Footer>
                </Modal>
                
                <Button onClick = {e => DeleteBest()} > DELETE </Button>

        </div>
    )
}

export default ModalAuy