import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import BlogsService from '../../services/BlogsService';

const DelReport_Modal = (props:any) => {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
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
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>คำเตือน</Modal.Title>
                </Modal.Header>
                <Modal.Title >
                    <p>การดำเนินการนี้เป็นการลบ Report ไม่ใช่การลบ Blog ที่ถูกรายงาน</p>
                </Modal.Title>
                <Modal.Body> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={DeleteReport}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DelReport_Modal;