import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import BlogsService from '../../services/BlogsService';
import '../../style/section.css';
const DelReport_Modal = (props:any) => {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handlerefresh = (e: any) => {
        window.location.reload(true);
    }
    const DeleteReport = () => {
        BlogsService.deleteReport(props.rblog.id)
        .then(blogs => {
            console.log(blogs)
            console.log("done")
        })
    } 

    

    return (
        <div>
            <Button className = "button-x"  onClick = {handleShow} >
                <div className="size-x">X</div>
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered

            >
                <Modal.Header>
                    คำเตือน
                </Modal.Header>
                <Modal.Body> 
                    <Card>
                        <Card.Body>
                            การดำเนินการนี้เป็นการลบ Report ไม่ใช่การลบ Blog ที่ถูกรายงาน
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    
                        <Button variant="danger" onClick={(e) => {
                            DeleteReport();
                            handlerefresh(e);
                            }}>
                            Confirm
                        </Button>
                    
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DelReport_Modal;