import React,{useState,useEffect}from 'react'
import { Button, ListGroup, Modal } from 'react-bootstrap'
import FetchReport from './FetchReport'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
const Modalcom = (props:any) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <div className="element"> 
            <ListGroup.Item className="blogcontainer" >
                <a href='#' onClick={handleShow}>
                    {props.rblog.content_id} 
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
                            {props.rblog.report_reason}
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
                            <Link to= {`/readReview/${props.rblog.id}`}>
                                <Button>View</Button>
                            </Link>
                        </ListGroup.Item>
                    </Modal.Footer>
                </Modal>
                <button>
                    &nbsp;Delete
                </button>
            </ListGroup.Item>
        </div>
    )
}
export default Modalcom
