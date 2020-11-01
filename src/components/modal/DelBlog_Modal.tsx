import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import BlogsService from '../../services/BlogsService'

const DelBlog_Modal = (props:any) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const DeleteBlog = () => {
        BlogsService.deleteBlog(props.blogID)
        .then(blogs => {
            console.log(blogs)
            console.log("done")
        })
    } 


    return (
        <div>    
            <button onClick = {handleShow}>
                DELETE
            </button>
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
                    <Modal.Title>คำเตือน</Modal.Title>
                </Modal.Header>
                <Modal.Title >
                    <p>ยืนยันการลบBlog</p>
                </Modal.Title>
                <Modal.Body> 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={DeleteBlog}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DelBlog_Modal;