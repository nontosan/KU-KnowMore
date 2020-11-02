import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
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
        <div className="alignright">    
            <Button variant="danger" onClick = {handleShow}>
                Delete Blog
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
                    <Modal.Title>คำเตือน</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                    <p>ยืนยันการลบBlog</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Link to= {`/`}>
                    <Button onClick={() => {
                        DeleteBlog();
                        handleClose();
                        }}>
                        Confirm
                    </Button>
                        </Link>
                    
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DelBlog_Modal;