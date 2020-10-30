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

    async function fetchData(){
        const res =  await fetch(`http://188.166.178.33:3000/comments/${props.rblog.content_id}`)
        res
            .json()
            .then(res => setComment(res))
            .catch(err => setErrors(err))
    }

    useEffect(() =>{ 
        fetchData();
    },[])

    return(
        <div className="element"> 
            <a href='#' onClick={handleShow}>
                {props.rblog.content_id} 
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
                        {commentData.map(data => (
                            <ListGroup.Item>
                                {data.content}
                            </ListGroup.Item>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary">Delete</Button>
                    </Modal.Footer>
                </Modal>
            </a>
            
        </div>
    )
}

export default ViewComment_Modal;